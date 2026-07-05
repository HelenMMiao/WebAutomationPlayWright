# 🚀 Playwright Framework: A Learning & Reference Guide

Welcome! This repository is my personal sandbox where I explore, experiment with, and document modern test automation practices. 

I built this project not just to practice, but to share what I've learned along the way. Whether you are just getting started in automation, looking for a reference architecture, or want to collaborate and share feedback, I hope you find this helpful!

---

## 💡 What’s Inside?

This framework is built using industry-standard design patterns. Here are the core concepts I've implemented and documented here:

* **Page Object Model (POM):** A deep dive into keeping code clean and maintainable by separating page element locators from the actual test logic.
* **Data-Driven Testing:** Decouple test scripts from test data, allowing the same test scenarios to run seamlessly with multiple data sets.
* **Hooks Implementation:** Organizing setup and teardown configurations (like `beforeAll`, `beforeEach`, `afterEach`, and `afterAll`) to efficiently manage browser contexts and test cleanups.
* **Environment Configuration & Global Auth:** Setting up clean configurations to easily toggle environments via `baseURL`. Includes implementing `storageState` to reuse authentication states across tests, while explicitly excluding the login tests to ensure the actual auth flow is always verified.

---
## 🧭 Roadmap & Future Explorations

Learning is an iterative process, and this framework is built to grow. As I dive deeper into the automation ecosystem, I plan to expand this repository with more advanced concepts. 
