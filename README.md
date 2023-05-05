## Technical requirements
- localization (at least 2 languages). You should be able to change the language by clicking on the toggler/select in header.
- semantic layout
- private routes, 404, error boundary
- using jQuery in the main application code is not allowed

## Application design requirements

- the application quality is characterized by the elaboration of details, attention to typography (no more than three fonts per page, font size of at least 14 px, optimal [font and background contrast](https://snook.ca/technical/colour_contrast/colour.html)), carefully selected content
- adaptive layout, the minimum page width of the application should be 320px
- interactivity of elements users can interact with; element hover effects; usage of different styles for the active and inactive state of the element; smooth animations
- the unity of styles of all pages of the application - the same fonts, button styles, indents, the same elements on all pages of the application have the same appearance and layout. Item colors and background images may vary. In this case, colors should be from the same palette, and background images from the same collection.

## Application structure

Your app must contain:

1. Welcome page
2. User auth
3. GraphiQL page with:
    - request editor
    - variables editor
    - headers editor (optional)
    - documentation explorer (should be lazy-loaded)
    - response section
   
### General requirements
- Errors from the api side - (Not found, unhandled rejection, etc) should be displayed in a user-friendly format (toast, pop-up, or something like this - up to your decision).

### Welcome page
- If user is not authorized, the page should contain a link to Sign In / Sign Up page
- If user is authorized, the page should contain a link to the Main page

### Header

- All Private routes should contain sticky header. Moment when it become sticky (if there is a scroll on a page) should be animated: color can be changed or it's height can become smaller. [Animated sticky header](https://www.youtube.com/watch?v=hR8UW5CvYgw)
- Sign Out button - signs user out

### Footer

- Footer should contain a link to the authors' github, the year the application was created, [course logo](https://rs.school/images/rs_school_js.svg) with [link to the course](https://rs.school/react/).
- Footer is displayed on all pages of the application.  

### Sign In / Sign Up

- For the authentication you should use Firebase with email option. Please, check this [article](https://blog.logrocket.com/user-authentication-firebase-react-apps/)
- Client-side validation should be implemented (email and password strength - minimum 8 symbols, at least one letter, one digit, one special character)
- Upon successful login, the user should be redirected to the Main page
- If the user is already logged in and tries to reach these routes, they should be redirected to the Main page

### Main page - GraphiQL
- Editor
- Variables section
- Headers section
- Documentation section, should be visible only when app will receive a successfull response with the schema definition from the api
- Response section

### Welcome route - max 10 points

- [ ] The welcome page should contain general information about the developers, project, and course. **2 point**
- [ ] In the upper right corner there are 2 buttons: Sign In and Sign Up. **2 point**
- [ ] If login token is valid and unexpired, change the Sign In and Sign Up buttons to the "Go to Main Page" button. **2 points**
- [ ] When the token expires - the user should be redirected to the "Welcome page" automatically. **3 points**
- [ ] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. **1 point**

### Sign In / Sign Up  - max 20 points

- [ ] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **5 points**
- [ ] Client-side validation should be implemented. **10 points**
- [ ] Upon successful login, the user should be redirected to the Main page **3 point**
- [ ] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page. **2 point**

### GraphiQL route - max 50 points
- [ ] Working editor allowing to edit the query. **15 points**
- [ ] Working documentation explorer, should be visible only when sdl request will succeed. **15 points**
- [ ] Variables section. Should be closed/opened **5 points**
- [ ] Headers section. Should be closed/opened **5 points**
- [ ] Response section. **10 points**


### General requirements - max 10 points

- [ ] Localization **5 point**
- [ ] Sticky header **5 points**


### Penalties
- [ ] React default favicon **- 5 points**
- [ ] The presence of errors and warnings in the console **- 2 points** for each
- [ ] The presence in the console of the results of the console.log execution **- 2 points** for each
- [ ] @ts-ignore or any usage (search through github repo) **- 1 point** for each
- [ ] Making commits after the deadline **- 20 points**  
- [ ] The administration reserves the right to apply penalties for the use of incorrect repository or branch names.
