var usersInfo;
var postsInfo;
var commentsInfo;

function Data(linkinfo) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', linkinfo, false); 
    xhr.send();

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
}

usersInfo = Data("https://mocki.io/v1/eac0398c-b77e-419e-b849-2f50b123cc3a");
postsInfo = Data("https://mocki.io/v1/70cb725f-5b3e-4923-8379-b58b7218dd15");
commentsInfo = Data("https://mocki.io/v1/95131837-44ab-48d1-899f-39b1b594c01b");

function postCard() {
    const container = document.querySelector('.postcontainer');

    postsInfo.forEach(post => {
        const user = usersInfo.find(user => user.id === post.userId);
        const posterInfo = document.createElement('div');
        posterInfo.classList.add("card");
        posterInfo.innerHTML = `
            <h3>${user.name}</h3>
            <p>${post.title}</p>
            <p>~ ${post.body}</p>
        `;
        
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = "Comments";
        let comments = false;
        button.onclick = function() {
            comments = !comments; 
            commented(post, posterInfo, comments);
        };

        posterInfo.appendChild(button);
        container.appendChild(posterInfo);
    });
}

function commented(post, posterInfo, comments) {
    const Comments = posterInfo.querySelectorAll('.comment');
    Comments.forEach(comment => comment.remove());

    if (comments) {
        commentsInfo.forEach(comment => {
            if (comment.postId === post.id) {
                const commentUser = usersInfo.find(user => comment.userId === user.id);
                const commentBody = document.createElement('div');
                commentBody.classList.add("comment");
                commentBody.innerHTML = `
                    <p>${commentUser.name}</p>
                    <p class="info">${comment.body}</p>`;
                posterInfo.appendChild(commentBody);
            }
        });
    }
}

postCard();
