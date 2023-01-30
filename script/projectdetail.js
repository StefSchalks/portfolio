window.onload = function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyD76aq-_xfKdVFCW8hnLRvecOVy6oeaAXE",
        authDomain: "portfolio-project-ee5dc.firebaseapp.com",
        projectId: "portfolio-project-ee5dc",
        storageBucket: "portfolio-project-ee5dc.appspot.com",
        messagingSenderId: "717486702758",
        appId: "1:717486702758:web:4b61b4215a240f068c7467",
        measurementId: "G-ENV6BVMN1W"
    };
    
    // Initialize Firebase & Firestore
    firebase.initializeApp(firebaseConfig);
    let db = firebase.firestore();
    
    // Get the Project ID from the URL
    let parameters = new URLSearchParams(window.location.search);
    let projectId = parameters.get("p");
    
    // Get the project data from the database
    db.collection("projects").doc(projectId).get()
    .then(doc => {
        console.log(doc.data());
        let title = doc.data().title;
        let images = doc.data().img;
        let descriptions = doc.data().descriptions;
        let tagList = doc.data().tags;
        let tags = "";

        let descriptionCount = doc.data().descriptions.length;
        let imageCount = doc.data().img.length;

        tagList.forEach(tag => {
            tags += `<p>${tag}</p>`;
        });

        document.getElementById("projectTitle").innerHTML = title;
        document.title = `${title} | Stef Schalks`;
        document.getElementById("project-description-intro").innerHTML = descriptions[0]['en'];
        document.getElementById("tags").innerHTML = tags;

        if (descriptionCount - 1 == imageCount) {
            for (let i = 0; i < descriptionCount; i++) {
                let description = descriptions[i + 1]['en'];
                let image = images[i];

                let container = document.createElement("div");
                container.classList.add("project-content-container");

                let descriptionElement = document.createElement("p");
                descriptionElement.innerHTML = description;

                let imageElement = document.createElement("img");
                imageElement.src = image;

                if (i % 2 == 0) {
                    container.appendChild(imageElement);
                    container.appendChild(descriptionElement);

                    document.getElementById("project-content").appendChild(container);
                } else {
                    container.appendChild(descriptionElement);
                    container.appendChild(imageElement);

                    document.getElementById("project-content").appendChild(container);
                }
            }
        }

    });
}