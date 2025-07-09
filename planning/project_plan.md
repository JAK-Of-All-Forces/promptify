# Project Plan

Pod Members: Amari May, Jessica Obi, and Kenna Nyuga-Galega

## Problem Statement and Description

Music lovers often move through a variety of activities throughout their day, from studying to commuting to hiking or working out. However, the playlists they use for those activities are usually built manually by the user themselves or other music lovers. This process can be tedious, especially when someone wants a playlist that fits both their personal taste and the vibe and/or duration of their activity.

The main purpose of our project is to personalize a playlist based on the users chosen activity and their Spotify data. How users will interact with our website is by signing into their Spotify account so that we can have access to their most recently played songs, after that they choose their activity that they would like to have a playlist for and then a playlist is curated for them and added to their account.

## User Roles and Personas

Music Listener: a user who is connecting their account to utilize our application and its features

1. Jonathan is an avid Nicki Minaj fan who is living in Queens, New York, New York. He has been listening to Nicki since her rise in the early 2010s, and has recognized that he mainly likes to listen to songs that either have her Roman alter ego, or have a strong beat- songs that are less melodic. Many fan created playlists do not fit this curated and unique interest, so her would like to make a playlist that consists of such songs.

2. Bugsby is an opera singer and major fan of the opera genre from Berlin, Germany. As a black opera singer, she is a minority within the opera scene. She wants to get a stronger understanding of the musical stylistic choices of modern opera singers that are still inspired by the current opera songs she listens to.

3. Kelis works as an intern for Salesforce in San Francisco, her commute to work is about 20 minutes 10 filled with walking and the other ten filled with waiting on a packed bus. In the mornings she loves listening to R&B music, however her spotify playlist covers a variety of genres so she spends half of her commute skipping songs rather than enjoying her playlist. Because she’s so busy with her work as an intern she doesn't have time to curate her own morning playlist, and she’s already tried looking some up on spotify and the ones recommended have songs she doesn’t like.


## User Stories

1. As a music listener, I want personalized playlists tailored to my lifestyle so that I can enjoy music that fits my daily activities and mood. 
2. As a music listener who is a student, I want playlists designed for studying and walking to class, so that I can stay focused and energized throughout my school day.
3. As a user who is employed, I want playlists that help me concentrate and match my music taste so that I can stay productive at work.
4. As a user who is a fitness enthusiast, I want high energy playlists suitable for workouts and outdoor activities so that I stay motivated while active.
5. As an avid hiker, I like to listen to indie and calming music while going on different hikes. I want to create a playlist that feels like a fresh breeze and allows me to enjoy the scenery.
6. As a student  who is currently in college and needs energetic music to study, I want a playlist that incorporates hip-hop and k-pop from my favorite playlist and has an album-like feel.
7. As a user who commutes to work by walking and taking the public bus, I want to enter that my commute length is 20 minutes so that I can get a 20 minute playlist. 
8. As a user, I want to type in my chosen activity for today so that I can have a playlist that matches it. 
9. As a user, I want to login in to my spotify so that the app can now look at my spotify data to curate a playlist. 
10. As a user who is a busy intern with crazy mornings, I want to curate R&B playlists designed for morning listening, so that I can avoid skipping songs or touching my phone on the crowded bus.
11. As a user, I want to be able to log out of Promptify securely without worrying about someone accessing my data.
12. As a user, after I login I want to be able to see my spotify username as I interact with Promptify for a more personalized experience.
13. As a user, I want to get a list of genre options so I can get a playlist based off of the genres I like.
14. As a user, I want to view my generated playlist before I save it to my Spotify.
15. As a user, I want to be able to view my recently generated playlists through Promptify.

## Pages/Screens

Mobile Wireframes: https://www.canva.com/design/DAGsnYd_xBc/qTUfBpov8Et5TeJhS6ORZg/edit
Regular Wireframes: https://www.canva.com/design/DAGshWRiq8E/6e6ES7irtFblGVo6qiqdrw/edit

## Data Model

Describe your app's data model using diagrams or tables

## Endpoints

We will implement the following API endpoints. For creating resources, we'll use POST: /api/playlists to submit user input (activity, genre, duration) to generate a playlist, /api/auth/login to start the Spotify OAuth login process, and /api/playlists/save to save the generated playlist to the user’s Spotify account. For reading data, we'll use GET: /api/playlists/generated to fetch the generated playlist for the results page, /api/genres to get available genres from Spotify, /api/user/profile to fetch the Spotify user’s profile data after OAuth login, and /api/playlists/history to retrieve all playlists previously generated by the user. Finally, for updates, we’ll use either PUT or POST: /api/auth/logout to clear authentication and remove the user’s token.

***Don't forget to set up your Issues, Milestones, and Project Board!***
