#define DRAG_MULT 0.048
// Determines how many sine waves are composed for generating the surface geometry
// This is slower
#define ITERATIONS_RAYMARCH 4
// Determines how many sine waves are composed for calculating the surface normals
// This is faster
#define ITERATIONS_NORMAL 32

precision lowp float;
varying vec2 uv;
uniform float time;
uniform vec2 resolution;
uniform vec2 lookPos;

vec2 wavedx(vec2 position, vec2 direction, float speed, float frequency, float timeshift) {
    float x = dot(direction, position) * frequency + timeshift * speed;
    float wave = exp(sin(x) - 1.0);
    float dx = wave * cos(x);
    return vec2(wave, -dx);
}

float getwaves(vec2 position, int iterations) {
    float iter = 0.0;
    float phase = 6.0;
    float speed = 2.0;
    float weight = 1.0;
    float w = 0.0;
    float ws = 0.0;
    for(int i=0;i<ITERATIONS_NORMAL;i++) {
        if (i > iterations) {
            break;
        }
        vec2 p = vec2(sin(iter), cos(iter));
        vec2 res = wavedx(position, p, speed, phase, time);
        position += normalize(p) * res.y * weight * DRAG_MULT;
        w += res.x * weight;
        iter += 12.0;
        ws += weight;
        weight = mix(weight, 0.0, 0.2);
        phase *= 1.18;
        speed *= 1.07;
    }
    return w / ws;
}

// Calculates surface geometry of the water by marching from a starting point above the water
// until the ray is below the water. Then returns the distance from intersection point to the camera
float raymarchwater(vec3 camera, vec3 start, vec3 end, float depth) {
    vec3 pos = start;
    float h = 0.0;
    // Create a ray pointing from the start point to the end point
    vec3 dir = normalize(end - start);
    // TODO: Tweak this maximum iteration number. What's the failure case here?
    for(int i=0;i<318;i++){
        // Calculate the water height along the XZ plane where we currently are along the wave
        // It has the depth subtracted from it to ensure that the maximum height possible is 0
        h = getwaves(pos.xz * 0.1, ITERATIONS_RAYMARCH) * depth - depth;
        // If the waves height is nearly above our position or is above it, then we're done.
        if(h + 0.01 > pos.y) {
            return distance(pos, camera);
        }
        // Otherwise march along the way, but scaling the marching according to
        // how close we are to the water height already
        pos += dir * (pos.y - h);
    }
    return -1.0;
}

float H = 0.0;
vec3 normal(vec2 pos, float e, float depth) {
    vec2 ex = vec2(e, 0);
    // Calculate the water height at the current position.
    H = getwaves(pos * 0.1, ITERATIONS_NORMAL) * depth;
    // Create a world position for the water height
    vec3 a = vec3(pos.x, H, pos.y);
    // Calculate the water height at a different point a small distance along the X-axis
    vec3 ax = vec3(pos.x - e, getwaves(pos * 0.1 - ex.xy * 0.1, ITERATIONS_NORMAL) * depth, pos.y);
    // Calculate the water height at a different point a small distance along the Z-axis (here called the Y)
    vec3 az = vec3(pos.x, getwaves(pos * 0.1 + ex.yx * 0.1, ITERATIONS_NORMAL) * depth, pos.y + e);
    // Calculate the direction of the normal with respect to the change along the X and Z axes
    return normalize(cross(normalize(a - ax), normalize(a - az)));
}

mat3 rotmat(vec3 axis, float angle)
{
	axis = normalize(axis);
	float s = sin(angle);
	float c = cos(angle);
	float oc = 1.0 - c;
	return mat3(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s, 
	oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s, 
	oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c);
}

/**
  Given a UV coordinate, generates a vector corresponding to the direction of a ray going from
 */
vec3 getRay(vec2 uv) {
    // Project the UV from [0, 1] space to [-1, 1] space and then scale the X component by the aspect ratio
    uv = (uv * 2.0 - 1.0) * vec2(resolution.x / resolution.y, 1.0);
    // Create a 3D vector for the direction.
    // Add lens distortion by subtly stretching rays at the edges of the screen
    vec3 proj = normalize(vec3(uv.x, uv.y, 1.0) + vec3(uv.x, uv.y, -1.0) * dot(uv, uv) * 0.05);
    return rotmat(vec3(0.0, -1.0, 0.0), 3.0 * (lookPos.x * 2.0 - 1.0)) * rotmat(vec3(1.0, 0.0, 0.0), 1.5 * (lookPos.y * 2.0 - 1.0)) * proj;
}

float intersectPlane(vec3 origin, vec3 direction, vec3 point, vec3 normal) {
    return clamp(dot(point - origin, normal) / dot(direction, normal), -1.0, 9991999.0);
}

vec3 extra_cheap_atmosphere(vec3 raydir, vec3 sundir){
    sundir.y = max(sundir.y, -0.07);
    float special_trick = 1.0 / (raydir.y * 1.0 + 0.1);
    float special_trick2 = 1.0 / (sundir.y * 11.0 + 1.0);
    float raysundt = pow(abs(dot(sundir, raydir)), 2.0);
    float sundt = pow(max(0.0, dot(sundir, raydir)), 2.0);
    float mymie = sundt * special_trick * 0.2;
    vec3 skycolor = vec3(5.5, 8.0, 12.0);
    vec3 suncolor = mix(vec3(1.0), max(vec3(0.0), vec3(1.0) - skycolor / 22.4), special_trick2);
    vec3 bluesky= skycolor / 22.4 * suncolor;
    vec3 bluesky2 = max(vec3(0.0), bluesky - skycolor * 0.002 * (special_trick + -6.0 * sundir.y * sundir.y));
    bluesky2 *= special_trick * (0.24 + raysundt * 0.24);
    return bluesky2 * (1.0 + 1.0 * pow(1.0 - raydir.y, 3.0)) + mymie * suncolor;
}
vec3 getatm(vec3 ray) {
     return extra_cheap_atmosphere(ray, normalize(vec3(1.0)));
}

float sun(vec3 ray) {
     vec3 sd = normalize(vec3(1.0));
    return pow(max(0.0, dot(ray, sd)), 528.0) * 110.0;
}
vec3 aces_tonemap(vec3 color) {
    mat3 m1 = mat3(
        0.59719, 0.07600, 0.02840,
        0.35458, 0.90834, 0.13383,
        0.04823, 0.01566, 0.83777
    );
    mat3 m2 = mat3(
        1.60475, -0.10208, -0.00327,
        -0.53108,  1.10813, -0.07276,
        -0.07367, -0.00605,  1.07602
    );
    vec3 v = m1 * color;
    vec3 a = v * (v + 0.0245786) - 0.000090537;
    vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));
}
void main() {
    float waterdepth = 2.1; // The maximum amount a wave can *lower* the wave surface
    vec3 wfloor = vec3(0.0, -waterdepth, 0.0); // The point defining the plane where the lowest point of the water is
    vec3 wceil = vec3(0.0, 0.0, 0.0); // The point defining the plane where highest point of the water is. This is by definition y=0.
    vec3 orig = vec3(0.0, 2.0, 0.0); // The point from which all rays originate
    vec3 ray = getRay(uv); // Get a ray shooting in the direction of the UV coordinate

    // If the ray intersection occurred very close to or above the water surface, assume we intersected with the atmosphere
    if(ray.y >= -0.01){
        // Set the color for this pixel according to atmosphere rules
        // First, get the color of the sky and then add the sun glare component
        // vec3 C = getatm(ray) + sun(ray);
        vec3 C = getatm(ray);
        //tonemapping
        C = aces_tonemap(C);
        gl_FragColor = vec4(C, 1.0);
        return;
    }
    // Otherwise, we calculate the shading of the water
    // Find where on the camera ray it would intersect with the water ceiling plane
    float hihit = intersectPlane(orig, ray, wceil, vec3(0.0, 1.0, 0.0));
    // Find where on the camera ray it would intersect with the water floor plane
    float lohit = intersectPlane(orig, ray, wfloor, vec3(0.0, 1.0, 0.0));
    // Transform the intersection points into world coordinates
    vec3 hipos = orig + ray * hihit;
    vec3 lopos = orig + ray * lohit;
    // Find where on the camera ray it would intersect with the water itself
    float dist = raymarchwater(orig, hipos, lopos, waterdepth);
    // Transform the intersection point into world coordinates
    vec3 pos = orig + ray * dist;

    // Calculate the wave surface normal at the current location
    vec3 N = normal(pos.xz, 0.001, waterdepth);
    // Gradually interpolate the normal to point directly upward as we move farther from the camera
    // This creates an effect that looks like Rayleigh scattering
    N = mix(vec3(0.0, 1.0, 0.0), N, 1.0 / (dist * dist * 0.01 + 1.0));
    // Reflect the camera ray off of the water
    vec3 R = reflect(ray, N);
    // Calculate a fresnel effect
    // TODO: Look into what this is actually doing. It appears to add like "depth" to the waves and darkens them
    float fresnel = (0.04 + (1.0-0.04)*(pow(1.0 - max(0.0, dot(-N, ray)), 5.0)));

    vec3 C = fresnel * getatm(R);
    //tonemapping
    C = aces_tonemap(C);

    gl_FragColor = vec4(C,1.0);
}
