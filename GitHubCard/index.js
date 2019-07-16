/* Step 1: using axios, send a GET request to the following URL 
            (replacing the placeholder with your Github name):
            https://api.github.com/users/<your name>
*/

//main node to attach dynamic content
const cards = document.querySelector('.cards')


axios.get('https://api.github.com/users/armandoroman1016')
  .then(data => {
    const userInfo = {
      location: data.data.location,
      profile: data.data.html_url,
      followers: data.data.followers,
      following: data.data.following,
      bio: data.data.bio,
      avatar: data.data.avatar_url,
      handle: data.data.login,
      name: data.data.name
    }
    const element = createGithubCard(userInfo)

    cards.appendChild(element)
  })

  //adding follower cars programmatically
  .then(() => {
    axios.get('https://api.github.com/users/armandoroman1016/followers')
      .then(data => {
        let followersArr = data.data

        class Followers{
          constructor(follower){
            axios.get(`https://api.github.com/users/${follower.login}`)
            .then( data => {
            this.location = data.data.location      
            this.profile = data.data.html_url
            this.followers = data.data.followers
            this.following = data.data.following
            this.bio = data.data.bio
            this.avatar = data.data.avatar_url
            this.handle = data.data.login
            this.name = data.data.name

            const newFollower = createGithubCard(this)
            cards.appendChild(newFollower);
            })
          }
        }

        const updatedFollowers = followersArr.map(follower => new Followers(follower))
      })
  })

  .catch(error => {
    console.log('There is an error: ', error)
  })
/* Step 2: Inspect and study the data coming back, this is YOUR 
    github info! You will need to understand the structure of this 
    data in order to use it to build your component function 

    Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
          create a new component and add it to the DOM as a child of .cards
*/
function createGithubCard(obj) {
  //create elements
  const card = document.createElement('div')
  const img = document.createElement('img')
  const profileLink = document.createElement('p')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')
  const location = document.createElement('p')
  const handle = document.createElement('h3')
  const name = document.createElement('h2')

  //set styling by adding classes to elements
  card.classList.add('card')
  handle.classList.add('username')
  name.classList.add('name')

  //set the content
  img.src = obj.avatar
  profileLink.textContent = `Profile: ${obj.profile}`
  followers.textContent = `Followers: ${obj.followers}`
  following.textContent = `Following: ${obj.following}`
  bio.textContent = `Bio: ${obj.bio}`
  location.textContent = `Location: ${obj.location}`
  handle.textContent = obj.handle
  name.textContent = obj.name

  //put together
  const userInfoElements = [handle, location, profileLink, followers, following, bio]

  card.appendChild(img)
  card.appendChild(name)
  userInfoElements.forEach(element => name.appendChild(element))

  return card
}

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['Bastlifa', 'AndrewA0112', 'pdadlani', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

// followersArray.forEach(follower => {
//   axios.get(`https://api.github.com/users/${follower}`)
// .then(data => {
//   const userInfo = {
//   location : data.data.location,
//   profile : data.data.html_url,
//   followers : data.data.followers,
//   following : data.data.following,
//   bio : data.data.bio,
//   avatar : data.data.avatar_url,
//   handle : data.data.login,
//   name : data.data.name
//   }
//   const element = createGithubCard(userInfo)

//   cards.appendChild(element)
// })
// .catch(error =>{
//   console.log('There is an error: ', error)
// })
// })


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
