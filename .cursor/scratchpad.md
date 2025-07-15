

# Base Minikit POAP Miniapp - Project Planning

## Background and Motivation

**Project Goal**: Build a fun, sleek, and interactive POAP (Proof of Attendance Protocol) miniapp for the event "A new Day One" using Base Minikit. The app should allow users to upload their image, composite it onto a pre-designed SVG with the event name and their name, and download the result as a keepsake.

**Key Requirements**:
- User uploads an image (e.g., selfie or avatar)
- User enters their name
- App composites the image and name onto a pre-designed SVG ("I will be attending 'A new Day One'")
- Download button to save the final POAP as an image
- Fun, sleek, and interactive UI/UX
- Mobile and desktop friendly

**Target Audience**: Event attendees and Base community members who want a personalized digital memento

**Technical Constraints**:
- Must use Base Minikit for app structure
- SVG compositing must work in-browser (no backend)
- Fast, responsive, and accessible

## Key Challenges and Analysis

1. **SVG Image Compositing**: Overlaying user-uploaded images onto a fixed SVG template, handling scaling, cropping, and positioning.
2. **Text Rendering**: Dynamically rendering the user's name onto the SVG in a visually appealing way.
3. **Download Functionality**: Exporting the final SVG (with image and text) as a downloadable PNG or SVG file.
4. **User Experience**: Making the upload, preview, and download process smooth and engaging.
5. **Design Consistency**: Ensuring the UI is visually fun, modern, and matches the event's vibe.

## High-level Task Breakdown

1. **Design & Asset Preparation**
   - [ ] Finalize SVG template for the POAP (with placeholder for image and name)
   - [ ] Define color palette, fonts, and fun UI elements

2. **Base Minikit App Setup**
   - [ ] Scaffold a new miniapp using Base Minikit
   - [ ] Set up project structure and dependencies

3. **Image Upload & Preview**
   - [ ] Implement image upload component (with drag-and-drop and file picker)
   - [ ] Show live preview of uploaded image in SVG template
   - [ ] Allow basic image adjustments (crop/scale/position if feasible)

4. **Name Input & SVG Text Rendering**
   - [ ] Add input for user name
   - [ ] Render name onto SVG in the correct position and style

5. **SVG Compositing & Export**
   - [ ] Composite user image and name onto SVG
   - [ ] Implement download button (export as PNG/SVG)

6. **UI/UX Polish & Interactivity**
   - [ ] Add fun animations and interactive touches
   - [ ] Ensure mobile responsiveness and accessibility

7. **Testing & Final Review**
   - [ ] Test on multiple devices/browsers
   - [ ] Final polish and bug fixes

## Project Status Board (POAP Miniapp)

- [ ] Design SVG template and UI assets
- [ ] Set up Base Minikit project
- [ ] Implement image upload and preview
- [ ] Add name input and SVG text rendering
- [ ] Composite and export final POAP
- [ ] Polish UI/UX and test

## Success Criteria
- User can upload an image and see it on the POAP template
- User can enter their name and see it rendered on the POAP
- User can download the final composited image
- The app is visually fun, sleek, and interactive
- Works on both desktop and mobile 