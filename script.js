
const defaultProfile = {
    name: "Astin Varghese Thomas",
    role: "Creative Developer & Technology Enthusiast",
    bio: "Passionate about technology, creativity and building meaningful digital experiences. Always learning, creating and exploring.",
    about: "I am an enthusiastic individual passionate about technology, innovation and creativity. I enjoy learning new skills, solving problems and turning ideas into reality.",
    educationTitle: "Your Education",
    education: "Add your educational qualifications here.",
    skills: ["HTML", "CSS", "JavaScript", "UI/UX Design", "Creative Thinking", "Problem Solving"],
    projects: [
        {
            title: "Personal Portfolio",
            description: "A professional personal portfolio website showcasing my skills and achievements."
        },
        {
            title: "Web Design",
            description: "A modern and responsive website design project."
        },
        {
            title: "Creative Project",
            description: "An innovative project built using modern technologies."
        }
    ],
    email: "your@email.com",
    instagram: "",
    linkedin: ""
};

let profile;

try {
    profile = JSON.parse(localStorage.getItem("avtProfile")) || defaultProfile;
} catch {
    profile = defaultProfile;
}

function renderProfile() {
    document.getElementById("heroName").textContent = profile.name;
    document.getElementById("heroRole").textContent = profile.role;
    document.getElementById("heroBio").textContent = profile.bio;

    document.getElementById("aboutName").textContent = profile.name;
    document.getElementById("aboutText").textContent = profile.about;

    document.getElementById("educationTitle").textContent = profile.educationTitle;
    document.getElementById("educationText").textContent = profile.education;

    document.getElementById("emailLink").href =
        "mailto:" + profile.email;

    document.getElementById("skillsContainer").innerHTML =
        profile.skills.map(skill =>
            `<div class="skill-card">${escapeHTML(skill)}</div>`
        ).join("");

    document.getElementById("projectsContainer").innerHTML =
        profile.projects.map((project, index) => `
            <div class="project-card">
                <div class="project-number">0${index + 1}</div>
                <h3>${escapeHTML(project.title)}</h3>
                <p>${escapeHTML(project.description)}</p>
            </div>
        `).join("");

    let socials = "";

    if (profile.instagram) {
        socials += `<a href="${safeURL(profile.instagram)}" target="_blank" rel="noopener noreferrer">Instagram ↗</a>`;
    }

    if (profile.linkedin) {
        socials += `<a href="${safeURL(profile.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`;
    }

    document.getElementById("socialLinks").innerHTML = socials;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function safeURL(value) {
    try {
        const url = new URL(value);
        return ["https:", "http:"].includes(url.protocol) ? escapeHTML(url.href) : "#";
    } catch {
        return "#";
    }
}

function openEditor() {
    document.getElementById("editorModal").classList.add("active");

    document.getElementById("editName").value = profile.name;
    document.getElementById("editRole").value = profile.role;
    document.getElementById("editBio").value = profile.bio;
    document.getElementById("editAbout").value = profile.about;

    document.getElementById("editEducationTitle").value = profile.educationTitle;
    document.getElementById("editEducation").value = profile.education;

    document.getElementById("editSkills").value = profile.skills.join(", ");

    document.getElementById("editProjects").value =
        profile.projects.map(p => `${p.title} | ${p.description}`).join("\n");

    document.getElementById("editEmail").value = profile.email;
    document.getElementById("editInstagram").value = profile.instagram;
    document.getElementById("editLinkedin").value = profile.linkedin;
}

function closeEditor() {
    document.getElementById("editorModal").classList.remove("active");
}

function saveProfile() {
    const projects = document.getElementById("editProjects").value
        .split("\n")
        .filter(line => line.trim())
        .map(line => {
            const [title, ...description] = line.split("|");

            return {
                title: title.trim(),
                description: description.join("|").trim()
            };
        });

    const email = document.getElementById("editEmail").value.trim();

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    profile = {
        name: document.getElementById("editName").value.trim() || defaultProfile.name,
        role: document.getElementById("editRole").value.trim(),
        bio: document.getElementById("editBio").value.trim(),
        about: document.getElementById("editAbout").value.trim(),
        educationTitle: document.getElementById("editEducationTitle").value.trim(),
        education: document.getElementById("editEducation").value.trim(),
        skills: document.getElementById("editSkills").value
            .split(",")
            .map(s => s.trim())
            .filter(Boolean),
        projects,
        email,
        instagram: document.getElementById("editInstagram").value.trim(),
        linkedin: document.getElementById("editLinkedin").value.trim()
    };

    try {
        localStorage.setItem("avtProfile", JSON.stringify(profile));
    } catch {
        alert("Unable to save changes in this browser.");
        return;
    }

    renderProfile();
    closeEditor();
    alert("Portfolio updated successfully!");
}

document.getElementById("year").textContent = new Date().getFullYear();

renderProfile();
