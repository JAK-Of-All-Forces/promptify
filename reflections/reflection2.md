# Reflection #2

Pod Members: **Amari May, Kenna Nyuga-Galega, Jessica Obi**

## Reflection Questions

* Name at least one successful thing this week.

One successful thing that happened this week was that we were able to essentially complete the MVP. This includes having all of the login functionality and protected routes being able to work. Additionally, the prompt page is able to make playlists given an optional name, activity, duration, genre, and optional BPM. This leads them to the playlist page which is now able to show the playlist cover and its respective tracks. The add to Spotify button is also working now, so whenever a user clicks it, it will add the playlist to the user’s Spotify account. On the homepage, it is also able to display the user’s playlist instead of dummy data which is all excellent development.

* What were some challenges you and/or your group faced this week?

One major challenge that we faced was the deployment of our application. All of the application is successfully deployed which includes both the frontend and backend. However, one problem that we didn’t foresee is that the Spotify API only allows us to stay in developer mode. This means that for other people to use our application, we have to pre-approve their Spotify emails so that they are able to log into the application. Once they are added to this list, everything works perfectly fine. This developer mode also only limits us to 25 pre-approved users. To get out of it, we have to be a certified business with over 250k users.

* Did you finish all of your tasks in your sprint plan for this week? If you did not finish all of the planned tasks, how would you prioritize the remaining tasks on your list?  (i.e over planned, did not know how to implement certain features, miscommunication from the team, had to pivot from original plans, etc.)

We did finish all of our tasks for our sprint this week.

* Did the resources provided to you help prepare you in planning and executing your capstone project sprint this week? Be specific, what resources did you find particularly helpful or which tasks did you need more support on?

We used one of our instructor Alex's demonstrations for the OpenAI prompting which definitely helped when it comes to the prompt page. Another thing that was generally helpful was the Spotify API Documentation, as it is essentially utilized on every page of our application from login, prompt, and each individual playlist page.

* Which features and user stories would you consider “at risk”? How will you change your plan if those items remain “at risk”?

As the MVP is essentially done, there are no user stories that are at risk. However, one thing that is mentioned in a lot of the user stories is specific genres. Right now, we only have 6 genres available to the user. However, we do plan on being able to pull all of the genres from the Spotify API, which will allow the user to have a lot more customability. We also do not know if the application is necessarily secure when the user logs out with their Spotify account. We clear their access token from our application, however, it doesn’t log them out from the Spotify application. However, when they log in to Spotify from our application, they are also logged into the Spotify application, so it is a bit iffy right now.