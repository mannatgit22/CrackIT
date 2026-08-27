const resume = `
MANNAT MISHRA
B.Tech Computer Science and Engineering
Email: mannat@example.com
GitHub: github.com/mannatmishra
LinkedIn: linkedin.com/in/mannatmishra

EDUCATION
Bachelor of Technology in Computer Science and Engineering
XYZ Institute of Technology
CGPA: 8.4/10
2022 - 2026

TECHNICAL SKILLS
Languages: JavaScript, Python, C++, Java
Frontend: React.js, HTML, CSS, SCSS
Backend: Node.js, Express.js
Database: MongoDB, MySQL
Authentication: JWT, Cookie-based Authentication
Tools: Git, GitHub, Postman, VS Code
Concepts: REST APIs, DSA, OOP, DBMS, Operating Systems

PROJECTS

1. AI Interview Preparation Platform
Tech Stack: React.js, Node.js, Express.js, MongoDB, Gemini API

- Developed an AI-powered interview preparation platform that analyzes a
  candidate's resume and job description.
- Implemented resume and job-description analysis using Google's Gemini API.
- Built an authentication system using JWT and HTTP-only cookies.
- Implemented protected routes for authenticated users.
- Developed REST APIs using Node.js and Express.js.
- Designed MongoDB schemas for users, interviews, questions, and preparation plans.
- Generated personalized technical and behavioral interview questions using AI.
- Implemented skill-gap analysis by comparing candidate skills with job requirements.

2. E-Commerce Web Application
Tech Stack: React.js, Node.js, Express.js, MongoDB

- Developed a full-stack e-commerce application using the MERN stack.
- Implemented user registration, login, authentication, and authorization.
- Built REST APIs for products, users, carts, and orders.
- Implemented product search, filtering, cart management, and order placement.
- Used MongoDB for storing users, products, and order information.

3. Student Management System
Tech Stack: Java, MySQL

- Developed a student management application using Java.
- Implemented CRUD operations for student records.
- Used MySQL for persistent data storage.
- Applied object-oriented programming concepts including inheritance,
  encapsulation, abstraction, and polymorphism.

DATA STRUCTURES AND ALGORITHMS

- Solved 180+ problems on LeetCode and other coding platforms.
- Strong understanding of arrays, strings, linked lists, stacks, queues,
  trees, graphs, recursion, sorting, searching, and dynamic programming.
- Regularly practices competitive programming and problem solving.

EXPERIENCE

Software Development Intern
ABC Technologies
May 2025 - July 2025

- Developed and maintained REST APIs using Node.js and Express.js.
- Worked with MongoDB for database operations.
- Fixed bugs and improved API response handling.
- Collaborated with other developers using Git and GitHub.
- Participated in code reviews and team discussions.

ACHIEVEMENTS

- Selected as a finalist in a national-level hackathon.
- Solved 180+ DSA problems.
- Built multiple full-stack web applications.
- Active member of the college technical club.

INTERESTS

- Full-stack development
- Artificial Intelligence
- Backend development
- System design
- Competitive programming
`;

const selfDescription = `
I am a final-year Computer Science and Engineering student who enjoys
building practical software applications and solving programming problems.

My strongest area is full-stack web development. I have worked extensively
with JavaScript, React, Node.js, Express.js, MongoDB, REST APIs, and
authentication systems.

One of my main projects is an AI-powered interview preparation platform.
The application takes a candidate's resume, self-description, and a job
description and uses an LLM to generate a personalized interview
preparation plan. It identifies skill gaps, generates technical and
behavioral questions, calculates a match score, and creates a preparation
roadmap.

I have also worked with Java and MySQL through academic projects, although
my practical experience with Java backend frameworks such as Spring Boot is
limited.

I enjoy backend development because I like understanding how applications
work behind the scenes, how APIs communicate, how databases store data, and
how authentication and authorization are implemented.

I am comfortable learning new technologies and usually learn best by
building projects rather than only studying theory.

My biggest areas for improvement are system design, cloud technologies,
advanced SQL, and production-level backend architecture.

I am currently looking for a software engineering role where I can
strengthen my backend development skills, work on real-world systems, and
continue learning modern technologies.
`;

const jobDescription = `
SOFTWARE ENGINEER - BACKEND

Company: TechNova Solutions
Location: Bangalore, India
Experience: 0-2 years

ABOUT THE ROLE

We are looking for a Software Engineer to join our backend engineering team.
The ideal candidate should have strong programming fundamentals and be
comfortable building scalable and maintainable backend services.

RESPONSIBILITIES

- Design, develop, test, and maintain backend services.
- Build scalable REST APIs and microservices.
- Work with relational and NoSQL databases.
- Write clean, maintainable, and well-tested code.
- Debug and troubleshoot application and production issues.
- Collaborate with frontend engineers, product managers, and other
  engineering teams.
- Participate in code reviews and technical discussions.
- Contribute to system design and architectural decisions.
- Improve application performance, reliability, and scalability.

REQUIRED QUALIFICATIONS

- Bachelor's degree in Computer Science, Engineering, or a related field.
- Strong programming fundamentals.
- Strong knowledge of Java.
- Experience with Spring Boot.
- Good understanding of REST APIs.
- Strong SQL and relational database knowledge.
- Understanding of data structures and algorithms.
- Knowledge of object-oriented programming.
- Familiarity with Git and software development practices.

PREFERRED QUALIFICATIONS

- Experience with microservices architecture.
- Knowledge of Docker and containerization.
- Familiarity with AWS or another cloud platform.
- Experience with MongoDB or other NoSQL databases.
- Understanding of distributed systems.
- Familiarity with CI/CD pipelines.

WHAT WE VALUE

- Strong problem-solving ability.
- Ability to learn new technologies quickly.
- Good communication and collaboration skills.
- Ownership and accountability.
- Ability to work effectively in a team.
- Curiosity and willingness to improve.

HIRING PROCESS

1. Online coding assessment
2. Technical interview
3. System design and project discussion
4. Behavioral interview
5. HR discussion
`;

module.exports = {
    resume,
    selfDescription,
    jobDescription
}