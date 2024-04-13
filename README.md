# Operation CyberShadow
You are a highly skilled operative, tasked by MI5, the UK's intelligence agency, to penetrate the defences of [Lexicon+](https://lexicon-plus.com/) an online platform utilised by a wanted individual. This elusive target has left behind a trail of digital breadcrumbs, with their security questions potentially holding the key to their whereabouts. Your mission, should you choose to accept it, is to unravel the mysteries hidden within their account before it's too late. But beware, for the journey ahead is fraught with peril, and the consequences of failure are dire.

#### Disclaimer
The target site has been designed by our team and we give permission for you to leverage the vulnerabilities discussed. Do not attempt this on sites where you do not have permission to do so. The email addresses of accounts on [Lexicon+](https://lexicon-plus.com/) are AI generated so do not attempt to send an email to them.

## Step 1
#### Explore the site structure and conduct recon
- Our agents have managed to obtain some of the site's source code. Have a look through for anything that might be useful
- Create an account on [Lexicon+](https://lexicon-plus.com/) and explore the site.
- Open source intelligence (OSINT) obtained from the site may be useful in targeting the agent.

## Step 2
#### Exploit vulnerabilities in the site's markdown renderer to perform a DOM-based XSS attack
- [Lexicon+](https://lexicon-plus.com/) allows users to create their own worksheets. These are written in markdown and render HTML for additional formatting.
- Parts of the code to render markdown have been aquired and are in the repository
- The HTML rendering is not properly sanitized. Find a vulnerability that allows you to run your own code when the markdown is rendered.

## Step 3
#### Access the site's database using injected code to obtain the password hashes of users
- The database rules of the site are poorly configured, relying on the front-end to only make appropriate requests
- For legacy users of the site, their password hash is stored in the same JSON based database that holds all the user created content. Our intel shows that the target is one of these legacy users.
- There are examples of database access in the aquired code base. Use these to explore the database and access the password hashes of users.

## Step 4
#### Crack the password hashing algorithm
- Our intel suggests that the user thegreatalex@gmail.com has a weak passord to their account.
- We know they are not the target but this information could be useful for identifying and cracking the algorithm.
- Crack this user's password to confirm that you have identified the correct algorithm.

## Step 5
#### Search for and identify potential targets
- Now you must look at other users of the site to identify the target on the site and access their data.
- Our OSINT reveals that the target follows lots of law related accounts on Instagram. Additionally, we know that they liked a post saying that people can make easy to remeber passwords by stringing words together.
- Identify potential targets and crack their passwords to access the answers to their security questions.

## Step 6
#### Decide who the target is and outline how you would establish contact
- You now need to decide which user is the target.
- By now, you have a range of information on this person that we can use to our advantage.
- Construct an opening message for one of our field agents to use to establish contact with the target.
