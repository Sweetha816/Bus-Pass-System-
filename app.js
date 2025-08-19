// Firestore DB
const db = firebase.firestore();

const busForm = document.getElementById("busForm");
const passesList = document.getElementById("passesList");

busForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const route = document.getElementById("route").value;
  const price = document.getElementById("price").value;

  // Add pass to Firestore
  await db.collection("passes").add({
    name,
    route,
    price,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  busForm.reset();
});

// Display booked passes in realtime
db.collection("passes").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  passesList.innerHTML = "";
  snapshot.forEach(doc => {
    const pass = doc.data();
    const li = document.createElement("li");
    li.textContent = `${pass.name} booked route ${pass.route} - ₹${pass.price}`;
    passesList.appendChild(li);
  });
});
