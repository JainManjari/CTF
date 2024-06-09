import "./styles.css";
import { useState, useEffect } from "react";

/*
script for figuring out url:

let elements = $("code > div > span > i");
let url = "";

for(let element of elements) {
    url += element.attributes[1].value
}

console.log("url", url);
// flag = mushily
// url => https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6d7573

*/

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [displayText, setDisplayText] = useState("_");
  const [index, setIndex] = useState(-1);
  const [isDisplayTextCompleted, setIsDisplayTextCompleted] = useState(false);
  const [listString, setListString] = useState("");

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6d7573",
      {
        method: "GET",
      }
    )
      .then((response) => response.text())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => console.error("error in fetching ", error));
  }, []);

  useEffect(() => {
    if (index >= data.length) {
      let timerId2 = setTimeout(() => setIsDisplayTextCompleted(true), 1000);
      return () => clearTimeout(timerId2);
    }
    let timeId = setTimeout(() => {
      let newText =
        displayText.substring(0, displayText.length - 1) +
        data.charAt(index) +
        "_";
      setDisplayText(newText);
      setIndex(index + 1);
    }, 500);
    return () => clearTimeout(timeId);
  }, [index]);

  useEffect(() => {
    if (isDisplayTextCompleted) {
      let listString = `<ol>`;

      for (let index in data) {
        listString += `<li>${data.charAt(index)}</li>`;
      }
      listString += `</ol>`;
      setListString(listString);
    }
  }, [isDisplayTextCompleted]);

  return (
    <div className="App">
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && <h1>{displayText}</h1>}
      {isDisplayTextCompleted && (
        <div dangerouslySetInnerHTML={{ __html: listString }} />
      )}
    </div>
  );
}
