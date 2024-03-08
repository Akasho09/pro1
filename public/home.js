// let s=document.getElementById('search-btn');
// s.addEventListener('click' ,()=>{
// fetch('/search' ,{
// method:'POST'
// });
// });
// const tosearch = document.getElementById('search-box').value;
// module.exports = tosearch;





// home.js
if (typeof window !== 'undefined') {
    document.getElementById('search-btn').addEventListener('click', () => {
        const inputValue = document.getElementById('search-box').value;
        // console.log(inputValue);
        fetch('/search', {
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputValue })
        })
        .then(response => response.json())
        .then(data => {
            console.log("here1");
            console.log(data.message); // Output the response from the server
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

}

