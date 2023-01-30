window.onload = function() {
    const firebaseConfig = {
        apiKey: "AIzaSyD76aq-_xfKdVFCW8hnLRvecOVy6oeaAXE",
        authDomain: "portfolio-project-ee5dc.firebaseapp.com",
        projectId: "portfolio-project-ee5dc",
        storageBucket: "portfolio-project-ee5dc.appspot.com",
        messagingSenderId: "717486702758",
        appId: "1:717486702758:web:4b61b4215a240f068c7467",
        measurementId: "G-ENV6BVMN1W"
    };

    firebase.initializeApp(firebaseConfig);

    // Initialize Cloud Firestore 
    var db = firebase.firestore();

    // Get all the projects from the projects collection
    db.collection("projects").get().then(documents => {
        documents.forEach(doc => {
            let title = doc.data().title;
            let description = doc.data().description_nl;
            let tagList = doc.data().tags;
            let imgthumbnail = doc.data().img1;
            let tags = "";

            tagList.forEach(tag => {
                tags += `<p>${tag}</p>`;
            });

            document.getElementById("projectList").innerHTML += `
            <a href="project.html?p=${doc.id}">
            <div class="projectblock">
                <div class="section-img" id="img-${doc.id}">
                </div>    
                <div class="section-1">
                    <h2>${title}</h2>
                    <div class="tags">
                        ${tags}
                    </div>
                </div>
                <div class="section-2">
                    <p class="description">${description}</p>
                </div>
            </div>
            </a>
            `;

            element = document.getElementById(`img-${doc.id}`);
            element.style.backgroundImage = `url('${imgthumbnail}')`;
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
            element.style.backgroundRepeat = "no-repeat";
        });
    });
}

