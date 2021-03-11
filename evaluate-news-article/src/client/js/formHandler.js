const post = async (url = '', data = {}) => {
    // debugger;
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        // console.log(response);
    
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("In Submit Handler!");
    /**
     *  - Get Value of the input for URL
     *  - Check if it's URL or not
     *      yes
     *          send it to the backend
     *      no
     *          show user message it's not valid URL
     */
    var urlInput = document.getElementById('article-url');
    var url = urlInput.value;

    if(Client.validateUrl(url) == true){
        // Valid URL
        // debugger;
        console.log("::: Form Submitted :::")
        post('http://localhost:8085/add-url', {_url : url}).then((result) => {
            console.log(result);
            document.getElementById('text').innerHTML = result.text;
            document.getElementById('agreement').innerHTML = result.agreement;
            document.getElementById('subjectivity').innerHTML = result.subjectivity;
            document.getElementById('confidence').innerHTML = result.confidence;
            document.getElementById('irony').innerHTML = result.irony;
            document.getElementById('score_tag').innerHTML = result.score_tag;
        });
        
        // fetch('http://localhost:8085/test')
        // .then(res => {
        //     return res.json()
        // })
        // .then(function(data) {
        //     console.log(data);
        //     document.getElementById('text').innerHTML = data.message
        // })
    } else {
        // Not valid URL
        alert('Not a valid URL!');
    }
}

export { handleSubmit, post }
