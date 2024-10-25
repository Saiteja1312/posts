
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
    const posterInfo = document.createElement('div');
    posterInfo.classList.add("card");
    container.appendChild(posterInfo);

    postsInfo.forEach(post => {
        const user = usersInfo.find(user => user.id === post.userId);
        const postDetails = document.createElement('div');
        postDetails.classList.add("post");
        postDetails.innerHTML = `
            <h4>${user.name}</h4>
            <p>${post.title}</p>
            <p>${post.body}</p>
        `;

        const btn = document.createElement('div');
        btn.classList.add('btn');
        const commentCard = document.createElement('a');
        commentCard.classList.add('button');
        commentCard.textContent = "Comments";
        commentCard.style.color = 'black';
        btn.appendChild(commentCard);

    /*    let commentsVisible = false;
        commentCard.onclick = function() {
            commentsVisible = !commentsVisible;
            const Comments = postDetails.querySelectorAll('.comment');
            Comments.forEach(comment => comment.remove());

            if (commentsVisible) {
                commented(post, postDetails);
            }
        };

        btn.appendChild(commentCard);*/
        postDetails.appendChild(btn);


        const arrow = document.createElement('i');
        arrow.classList.add( 'fas', 'fa-angle-down'); 
        arrow.style.cursor = 'pointer';
        let commentsVisible = false;
        arrow.onclick = function() {
            commentsVisible = !commentsVisible;
            const Comments = postDetails.querySelectorAll('.comment');
            Comments.forEach(comment => comment.remove());

            if (commentsVisible) {
                commented(post, postDetails);
            }
        };


        btn.appendChild(arrow);
        posterInfo.appendChild(postDetails);
    });
}

function commented(post, postDetails) {
    commentsInfo.forEach(comment => {
        if (comment.postId === post.id) {
            const commentUser = usersInfo.find(user => comment.userId === user.id);
            const commentBody = document.createElement('div');
            commentBody.classList.add("comment");
            commentBody.innerHTML = `
                <p><b>${commentUser.name}</b></p>
                <p class="info">${comment.body}</p>`;
            postDetails.appendChild(commentBody);
        }
    });

}

postCard();
