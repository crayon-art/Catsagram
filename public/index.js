// Your code here
//add event listener to inject code on page load
window.addEventListener("DOMContentLoaded", async () => {
    const h2Element = document.createElement("h2");
    h2Element.innerText = "Catsagram";
    document.body.appendChild(h2Element);

    try{
//request a random cat image from the cat API
        const res = await fetch ("https://api.thecatapi.com/v1/images/search");
        const data = await res.json();
        const url = data[0].url;

//add div block for cat image on html page
        const newdiv = document.createElement("div");
        newdiv.id = "img";
        newdiv.innerHTML = `<img src="${url}"">`;
        document.body.appendChild(newdiv);

//add a button for a new cat image
        const newbtn = document.createElement("button");
        newbtn.id = "getcat";
        newbtn.innerText = "New Cat";
        document.body.append(newbtn);

//add a popularity score section
        let popScore = 0;

        const newdiv2 = document.createElement("div");
        newdiv2.id = "popularity";
        newdiv2.innerText = `Popularity Score: ${popScore}`;
        document.body.appendChild(newdiv2);

//function to update popularity score
const updateScore = (popScore)=>{
        const temp = document.getElementById("popularity");
        temp.innerText = `Popularity Score: ${popScore}`;
};

//add icons for like and dislike

//div element to hold thumbs up and thumbs down icon
        const newdiv3 = document.createElement("div");
        newdiv3.id = "rate";
        document.body.appendChild(newdiv3);

//thumbs up icon
        const ratings = document.getElementById("rate");
        const thumbsUp = document.createElement("button");
        thumbsUp.id = "thumbsup";
        thumbsUp.innerHTML = `👍🏼`; //use a pic from online
        ratings.appendChild(thumbsUp);

//thumbs down icon
        const thumbsDown = document.createElement("button");
        thumbsDown.id = "thumbsdown";
        thumbsDown.innerHTML = `👎🏼`; //use a pic from online
        ratings.appendChild(thumbsDown);


//add listener event for clicking thumbs up and thumbs down
        const thumbsUpButton = document.getElementById("thumbsup");
        thumbsUpButton.addEventListener("click", () => {
                popScore+=1;
                updateScore(popScore);
        });

        const thumbsDownButton = document.getElementById("thumbsdown");
        thumbsDownButton.addEventListener("click", () => {
                if(popScore>0){
                        popScore-=1;
                }
                updateScore(popScore);
        });

//add a box to add a new comment under the pic
        const newdiv4 = document.createElement("div");
        newdiv4.id="addComment";
        newdiv4.innerHTML = `<p id="commentLabel">Comment: </p>
        <input type ="text" id="commentBox" placeholder="Add a comment..."/>
        <button id=addCommentBtn>Submit</button>`;
        document.body.appendChild(newdiv4);

//add event listener for when a new comment is submitted
        let commentsArr = [];
        const submitBtn = document.getElementById("addCommentBtn");
        submitBtn.addEventListener("click", ()=>{
        const commentBox = document.getElementById("commentBox");
                if (commentBox.value!==""){
                        const commentBox = document.getElementById("commentBox");
                        commentsArr.push(commentBox.value);
                        commentsCounterUpdate();
                        if(commentsArr.length>1&&document.getElementById("listOfComments")){
                                const temp4 = document.getElementById("listOfComments");
                                document.body.removeChild(temp4);
                        }
                        populateComments();
                        commentBox.value = "";
                }
        });

//add a comment box showing all comments
        const newdiv5 = document.createElement("div");
        newdiv5.id = "allComments";
        document.body.appendChild(newdiv5);

        const temp2 = document.getElementById("allComments");
        const commentsTitle = document.createElement("button");
        commentsTitle.id = "commentsTitle";
        commentsTitle.innerText = `Comments (${commentsArr.length})`;
        temp2.appendChild(commentsTitle);

//update comments counter
        const commentsCounterUpdate = ()=>{
        const commentsTitle = document.getElementById("commentsTitle");
        commentsTitle.innerText = `Comments (${commentsArr.length})`;
        }

//function to populate comments
        const populateComments = () =>{
                const newdiv6 = document.createElement("div");
                newdiv6.id = "listOfComments";
                document.body.appendChild(newdiv6);
                let j=1;

                for (let i=0; i<commentsArr.length; i++){
                        const temp3 = document.createElement("div");


                        if(i===1||i%2!==0){
                                temp3.id="lightbackground";

                        }
                        else temp3.id = "darkbackground";

                        temp3.className = `comment comment${j}`;


                        temp3.innerHTML = `<div>${commentsArr[i]}</div>
                                           <button class="delComment" id=delComment${j}>❌</button>`;
                        const delElem = document.getElementById("listOfComments");

                        delElem.appendChild(temp3);


                        //add delete button to delete comment

                        const delbtn = document.getElementById(`delComment${j}`);

                        delbtn.addEventListener("click", (e)=>{

                                const commentid = (delbtn.id);
                                const commentNum = Number(commentid[commentid.length-1]);


                                console.log(commentsArr);
                                commentsArr.splice(commentNum-1, 1);
                                console.log(commentsArr);

                                const delComment = document.getElementsByClassName(`comment${commentNum}`)[0];
                                const parent = document.getElementById("listOfComments");
                                parent.removeChild(delComment);

                                 commentsCounterUpdate();

                                 // Re-populate comments to fix IDs and classes
                                document.body.removeChild(newdiv6);
                                populateComments();
                        });
                        j+=1;
                }
        }

//add event listener for when the comments button is clicked
        const allComments = document.getElementById("commentsTitle");
        allComments.addEventListener("click", ()=>{
                if(!document.body.children[7]){
                        populateComments();
                        commentsCounterUpdate();
                }
                else {
                        delElem = document.getElementById("listOfComments");
                        document.body.removeChild(delElem);
                        commentsCounterUpdate();
                }

        });

//add a button to generate a new cat pic
        const newCatBtn = document.getElementById("getcat");
        newCatBtn.addEventListener("click", async()=>{
        //request a random cat image from the cat API
                const res = await fetch ("https://api.thecatapi.com/v1/images/search");
                const data = await res.json();
                const url = data[0].url;

        //add div block for cat image on html page
                const imgdiv = document.getElementById("img");
                imgdiv.innerHTML = `<img src="${url}"">`;

        //reset popularity scores
                popScore = 0;
                updateScore(popScore);

        //reset comments
                commentsArr=[];
                commentsCounterUpdate();
                delElem = document.getElementById("listOfComments");
                document.body.removeChild(delElem);
        });

    } catch (e) {
        console.log("couldn't fetch cat pic ^>.<^");
    }

});
