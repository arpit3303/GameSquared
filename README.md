To start the project
npm i 
npm start 

The approach


1) Centralized State Management:


  a) Context API with Providers: Used to manage a centralized state that tracks columns and cards across the board.

  b) Dynamic Updates: When cards are moved or reordered, the state reflects these changes immediately. This setup allows easy adaptation to future requirements, like adding card statuses.


  
2) Drag-and-Drop Functionality:


  a) React-Beautiful-DnD: This library provides drag-and-drop interactions for both cards and columns, delivering seamless user experience with real-time visual cues for drag and drop states.



3) Card Operations:


  a)Add and Move: New cards start in the "To-Do" column and can be moved to any other column, adapting their placement accordingly.


  
4) Column Management:


  a) Order and Flexibility: Columns are reorderable and can contain multiple cards. Two default columns ("To-Do" and "Done") are provided, with the option to add more as needed.



Notes:


  a) Column deletion is not implemented but can be added similarly to card deletion.

  b) card doesnot have its own status, more information can be added if required. In the current solution this is drived from column.
  
