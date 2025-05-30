# Sales Training Portal

A lightweight web application for internal sales training and certification. This application allows sales team members to complete training modules, take quizzes, and submit their results.

Visit the site: [Sales Training](https://buteossystems.thefairshoppe.com)

## Features

- Multi-step training workflow
- Three comprehensive training modules
- Interactive quizzes for each module
- Automatic progress tracking
- Secure submission of training results to AWS S3

## Technical Overview

- Pure HTML, CSS, and JavaScript implementation
- No server-side dependencies required
- AWS S3 integration for storing training results
- AWS Cognito for secure authentication
- Responsive design for desktop and mobile use

## Setup

1. Clone the repository
2. Configure AWS credentials in `assets/training.js`:
   - S3 bucket name
   - AWS region
   - Cognito Identity Pool ID
3. Ensure the IAM role has proper S3 permissions:
   - `s3:PutObject`
   - `s3:GetObject`
   - `s3:ListBucket`
4. Open `index.html` in a web browser

## Project Structure

- `index.html` - Main entry point
- `training.html` - Training modules and quizzes
- `pricing.html` - Product pricing reference
- `funnel.html` - Sales funnel visualization
- `assets/` - JavaScript, CSS, and image resources

## Security Note

This application is intended for internal use only. The AWS credentials should be properly secured using Cognito Identity Pools with appropriate IAM policies.

## License

MIT
