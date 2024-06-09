console.log("file loaded");

{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript" src="home.js"></script> */}


let elements = $("code > div > span > i");

let url = "";

for(let element of elements) {
    url += element.attributes[1].value
}

console.log("elements ", elements);

console.log("url", url);


// flag = mushily

// url => https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6d7573