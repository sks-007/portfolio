# Sachin Kumar Singh - Personal Portfolio

A modern, dynamic, and fully responsive personal portfolio website built with Next.js and Supabase. Designed to showcase projects, skills, certifications, and a personal blog, complete with a custom built-in Content Management System (CMS).

## Live Demo

[Visit Portfolio](https://sachinportfolio-sand-2db.vercel.app/)

## Features

- **Dynamic Content Management:** Custom-built secure admin dashboard to manage all sections without touching the codebase.
- **Project Showcase:** Filterable gallery of projects with images, descriptions, and direct links.
- **Experience & Education:** Dynamic timelines detailing professional journey and academic history.
- **Certifications:** Grid layout showcasing earned badges and credentials.
- **Integrated Blog:** Write, edit, and publish Markdown-based blog posts directly from the admin panel.
- **Contact System:** Integrated contact form that saves messages directly to the database for admin review.
- **Dark/Light Aesthetics:** Carefully crafted premium UI focusing on modern typography, glassmorphism, and smooth micro-interactions.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, Vanilla CSS for styling.
- **Backend/Database:** [Supabase](https://supabase.com/) (PostgreSQL).
- **Authentication:** Custom Basic HTTP Auth middleware for the admin dashboard.
- **Deployment:** [Vercel](https://vercel.com/)

## Database Schema

This project relies on a Supabase PostgreSQL backend with the following tables:
- projects
- certifications
- experience
- education
- project_domains
- posts (Blog)
- contact_messages
