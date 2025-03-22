document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const responseContainer = document.createElement("div");
    responseContainer.classList.add("response-container");
    form.appendChild(responseContainer);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const brand = form.querySelector("input[placeholder='Brand']").value;
        const audience = form.querySelector("input[placeholder='Targeting audience']").value;
        const budget = form.querySelector("input[placeholder='Budget']").value;
        const productName = form.querySelector("input[placeholder='Product Name']").value;
        const productDescription = form.querySelector("textarea").value;
        
        const question = `Brand: ${brand}, Audience: ${audience}, Budget: ${budget}, Product Name: ${productName}, Description: ${productDescription}`;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer wh_m76gtkoxLWL13MhmKI0JfolJKSo1JV3weQY3xIUu9xm");

        var raw = JSON.stringify({
            "question": question,
            "model": "aicon-v4-nano-160824",
            "randomness": 0.5,
            "stream_data": true,
            "training_data": "Add your training data or system messages",
            "response_type": "text",
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.worqhat.com/api/ai/content/v4", requestOptions)
            .then(response => response.text())
            .then(result => {
                let lines = result.split("\n");
                let fullText = "";

                lines.forEach(line => {
                    if (line.startsWith("data: ")) {
                        try {
                            let jsonData = JSON.parse(line.replace("data: ", ""));
                            if (jsonData.content) {
                                fullText += jsonData.content + " ";
                            }
                        } catch (e) {
                            console.error("Error parsing JSON:", e);
                        }
                    }
                });

                responseContainer.innerHTML = `<p>Response: ${fullText.trim()}</p>`;
            })
            .catch(error => console.log('error', error));
    });
});
