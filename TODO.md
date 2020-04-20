TODO:
[x] Introduce React with Parcel.
[x] Add react routing
[ ] Integrate per-page routing with the look position of the screen
[ ] Create gallery pages with sample content
[x] Create simple YAML-based templating system to generate gallery content
[ ] Correctly transition the look position for the background as you navigate. This should, again, be tied to the routing.
[ ] Create contact page
[ ] Templating engine supports markdown in the descriptions
[ ] Fill in with all real content.

Yeah so I think the way that we would want to do this is by using React with React router to create an SPA that can be routed to directly, and then each page has an associated camera tilt value that transitions between pages. Basically the only page that would have a value that is different than the others is the home page. All other pages would be facing ABOVE at a fixed viewpoint.

The main downside of this is that this requires that we make our own templating system for the galleries for her. But the content is so simple that it really shouldn't be difficult to do this. Just yaml files defining the image, its title, and a description probably. Then just a yaml loader for parcel.

Pages:

- Splash
- Gallery
- Contact

Navigation:

- Home/Splash marneymiller./
- Portfolio /makes
  - Category A /makes/a
  - Category B /makes/b
- Projects
  - Project A /made/a
  - Project B /made/b
- About/Contact /is
