<!-- ![CliqueUPLogo](public/LightLogo.webp) -->

# Welcome to Chatly!

The app where you can get chatty with your friends!

To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## Table of Contents

- [Welcome to Chatly!](#welcome-to-chatly)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [User Stories](#user-stories)
      - [User Story 1: Chat Room Entry](#user-story-1-chat-room-entry)
      - [User Story 2: Send Messages](#user-story-2-send-messages)
      - [User Story 3: Send Images](#user-story-3-send-images)
      - [User Story 4: Share Location](#user-story-4-share-location)
      - [User Story 5: Offline Message Reading](#user-story-5-offline-message-reading)
      - [User Story 6: Screen Reader Compatibility](#user-story-6-screen-reader-compatibility)
    - [Key Features](#key-features)
      - [Feature 1: User Setup Page](#feature-1-user-setup-page)
      - [Feature 2: Chat Interface](#feature-2-chat-interface)
      - [Feature 3: Additional Communication Features](#feature-3-additional-communication-features)
      - [Feature 4: Data Storage](#feature-4-data-storage)
  - [Technical Requirements](#technical-requirements)
  - [Technologies Used](#technologies-used)
    - [Dependencies](#dependencies)
    - [Dev Dependencies](#dev-dependencies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data
- Data gets stored online and offline


### User Stories
#### User Story 1: Chat Room Entry
As a new user
  I want to be able to easily enter a chat room
  So that I can quickly start talking to my friends and family

```gherkin
Feature: Chat Room Entry  
  Scenario: New user enters a chat room
    Given I am a new user
    When I open the app
    Then I should see an option to enter a chat room
    And I should be able to enter the chat room with minimal steps
```
#### User Story 2: Send Messages
As a user
  I want to be able to send messages to my friends and family members
  So that I can exchange the latest news

```gherkin
Feature: Send Messages
  Scenario: User sends a text message
    Given I am in a chat room
    When I type a message
    And I press the send button
    Then my message should appear in the chat
    And other users in the chat should see my message
```
#### User Story 3: Send Images
As a user
  I want to send images to my friends
  So that I can show them what I'm currently doing
```gherkin
Feature: Send Images
  Scenario: User sends an image
    Given I am in a chat room
    When I select the option to send an image
    And I choose an image from my device
    And I confirm the image selection
    Then the image should be sent and appear in the chat
```
#### User Story 4: Share Location
As a user
  I want to share my location with my friends
  So that I can show them where I am

```gherkin
Feature: Share Location  
  Scenario: User shares their location
    Given I am in a chat room
    When I select the option to share my location
    And I confirm the location sharing
    Then my current location should be sent and displayed in the chat
```
#### User Story 5: Offline Message Reading
As a user
  I want to be able to read my messages offline
  So that I can reread conversations at any time

```gherkin
Feature: Offline Message Reading  
  Scenario: User reads messages offline
    Given I have previously received messages
    When I open the app without an internet connection
    Then I should be able to view my previous conversations
```
#### User Story 6: Screen Reader Compatibility
As a user with a visual impairment
  I want to use a chat app that is compatible with a screen reader
  So that I can engage with a chat interface
```gherkin
Feature: Screen Reader Compatibility 
  Scenario: Visually impaired user navigates the app
    Given I am a user with a visual impairment
    When I use the app with a screen reader
    Then all elements of the app should be properly labeled and navigable
    And I should be able to compose and send messages using the screen reader
```

### Key Features
#### Feature 1: User Setup Page
```gherkin
Feature: User Setup Page
  Scenario: User sets up their profile
    Given I am a new user
    When I open the app for the first time
    Then I should see a page where I can enter my name
    And I should be able to choose a background color for the chat screen
    And I should have an option to join the chat after completing these steps
```
#### Feature 2: Chat Interface
```gherkin
Feature: Chat Interface
  Scenario: User interacts with the chat interface
    Given I am in the chat room
    Then I should see a page displaying the conversation
    And I should see an input field for typing messages
    And I should see a submit button to send messages
```
#### Feature 3: Additional Communication Features
```gherkin
Feature: Additional Communication Features
  Scenario: User accesses additional communication options
    Given I am in the chat room
    Then I should have an option to send images
    And I should have an option to send location data
```
#### Feature 4: Data Storage
```gherkin
Feature: Data Storage
  Scenario: App stores data online and offline
    Given I am using the app
    When I send or receive messages, images, or location data
    Then this data should be stored online
    And this data should also be available offline
```

## Technical Requirements
- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.

## Technologies Used

- React Native
- Expo
- Google Firestore Database
- Firebase Cloud Storage

### Dependencies
      
### Dev Dependencies	

## Getting Started

### Prerequisites

- Node.js (16.19.0) **Must downgrade to this version!**
  - Before installing Expo, ensure you have a suitable version of Node installed. At the time of writing, Expo only supports Node 16.. at max, so if you have a higher version than 16.., make sure to downgrade to “16.19.0” by running the following commands:
```
  nvm install 16.19.0
  nvm use 16.19.0
```
- Expo and Expo CLI
 ```
  npm install -g expo-cli
```
- Expo Go App
- Android Emulator

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/eahowell/meet.git
   cd meet
   ```

2. Install dependencies:

   ```
   npm install
   ```


## Running the Application

To start the development server:

```
npm start
```

Visit `http://localhost:3000` in your browser to view the application.

## Running Tests

This project uses Jest and React Testing Library for unit and integration tests. To run the tests:

```
npm test
```

To run all tests in watch mode and get testing coverage:

```
npm test -- --coverage --watchAll
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License
MIT