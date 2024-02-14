const SERVER_URL = "http://localhost:4000";

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const getAllNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesBody = await getAllNoteRes.json();

  expect(getAllNoteRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(0);
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  // delete note
  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
});


});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // post two notes
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes1.json();

  const title2 = "NoteTitleTest2";
  const content2 = "NoteTitleContent2";

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });
  const postNoteBody2 = await postNoteRes2.json();


  const getAllNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesBody = await getAllNoteRes.json();

  expect(getAllNoteRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2);

  // delete note
  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  });
  await fetch(`${SERVER_URL}/deleteNote/${postNoteBody2.insertedId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  });



});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();


  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes1.json();

  const newTitle = "newNoteTitle";
  const newContent = "newNoteContent";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
    }),
  });
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes1.json();

  const newTitle = "newNoteTitle";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes1.json();

  const newContent = "newNoteContent";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: newContent,
    }),
  });
  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();
});

test("/deleteAllNotes - Delete one note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  // delete note
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  })
  const deleteAllNotesBody = await deleteAllNotesRes.json();
  expect(deleteAllNotesRes.status).toBe(200);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // post 3 notes
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const postNoteBody2 = await postNoteRes2.json();
  const postNoteBody3 = await postNoteRes3.json();

  // delete note
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  })
  const deleteAllNotesBody = await deleteAllNotesRes.json();
  expect(deleteAllNotesRes.status).toBe(200);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  //update colour 
  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     color: "#FF0000",
    }),
  });

  const updateNoteColorBody = await updateNoteColorRes.json();

  expect(updateNoteColorRes.status).toBe(200)

  // delete note
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
  })
});
