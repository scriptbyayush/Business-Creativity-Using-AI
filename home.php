<?php
$worqhat_result = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect input values from the form
    $brand = isset($_POST['brand']) ? trim($_POST['brand']) : "";
    $budget = isset($_POST['budget']) ? trim($_POST['budget']) : "";
    $product_name = isset($_POST['product_name']) ? trim($_POST['product_name']) : "";
    $product_description = isset($_POST['product_description']) ? trim($_POST['product_description']) : "";
    $target_audience = isset($_POST['target_audience']) ? trim($_POST['target_audience']) : "";

    // Combine inputs into a single prompt
    $prompt1 = "Brand: $brand, Budget: $budget, Product Name: $product_name, Description: $product_description, Target Audience: $target_audience give me the social media post description also use hashtag(you are using as an api in my project so just give me the descripton and nothing else 'like here the descripton for you or any other un want text')";

    // Sending request to WorqHat API
    $worqhat_url = "https://api.worqhat.com/api/ai/content/v4";
    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer wh_m77agwlaJkwXJ5rmChytcdnWaHYT9SMSgNGs40cWd"
    ];

    $worqhat_data1 = [
        "question" => $prompt1,
        "model" => "aicon-v4-nano-160824",
        "randomness" => 0.5,
        "stream_data" => false,
        "training_data" => "Add your training data or system messages",
        "response_type" => "text"
    ];

    $payload1 = json_encode($worqhat_data1);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $worqhat_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload1);

    $worqhat_response1 = curl_exec($ch);

    if (curl_errno($ch)) {
        $worqhat_result1 = "cURL Error: " . curl_error($ch);
    } else {
        $response_data1 = json_decode($worqhat_response1, true);
        $worqhat_result1 = isset($response_data1["content"]) ? $response_data1["content"] : "No response received.";
    }

    
    
    $prompt2 = "Brand: $brand, Budget: $budget, Product Name: $product_name, Description: $product_description, Target Audience: $target_audience give me the formal email for sending to users about the product (and remember you are using this as an API in my project, so just give me the formal email with subject and body and nothing else like 'here is the email for you').";

    // Sending request to WorqHat API
    $worqhat_url = "https://api.worqhat.com/api/ai/content/v4";
    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer wh_m77agwlaJkwXJ5rmChytcdnWaHYT9SMSgNGs40cWd"
    ];

    $worqhat_data2 = [
        "question" => $prompt2,
        "model" => "aicon-v4-nano-160824",
        "randomness" => 0.5,
        "stream_data" => false,
        "training_data" => "Add your training data or system messages",
        "response_type" => "text"
    ];

    $payload2 = json_encode($worqhat_data2);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $worqhat_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload2);

    $worqhat_response2 = curl_exec($ch);

    if (curl_errno($ch)) {
        $worqhat_result2 = "cURL Error: " . curl_error($ch);
    } else {
        $response_data2 = json_decode($worqhat_response2, true);
        $worqhat_result2 = isset($response_data2["content"]) ? $response_data2["content"] : "No response received.";
    }





    $prompt3 = "product name : $product_name, Description: $product_description, generate the image";




    $url = "https://api.worqhat.com/api/ai/images/generate/v3"; // API Endpoint

    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer wh_m77agwlaJkwXJ5rmChytcdnWaHYT9SMSgNGs40cWd" // API Key
    ];
    
    $data = [
        "prompt" => [$prompt3],
        "image_style" => "real world",
        "orientation" => "Square",
        "output_type" => "url"
    ];  
    
    $options = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_SSL_VERIFYPEER => false // Ignore SSL verification if needed
    ];
    
    $curl = curl_init();
    curl_setopt_array($curl, $options);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    
    // Check for errors
   
if ($httpCode == 200) {
  // Extract only the image URL using regex
  preg_match('/https:\/\/storage\.googleapis\.com\/[^\s",]+/', $response, $matches);
  
  if (!empty($matches)) {
      $worqhat_result3 = $matches[0]; // Store only the extracted image URL
  } else {
      $worqhat_result3 = "Error: Image URL not found in response";
  }
} else {
  $worqhat_result3 = "Error: " . $response;
}
    
    









    
    
    
    curl_close($ch);
}
?>

<!DOCTYPE html>
<!-- Coding By CodingNepal - youtube.com/@codingnepal -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebar with Dropdown Menu | CodingNepal</title>
    <link rel="stylesheet" href="style1.css" />
    <!-- Linking Google Fonts for Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
  </head>
  <body>
    <!-- Mobile Sidebar Menu Button -->
    <button class="sidebar-menu-button">
      <span class="material-symbols-rounded">menu</span>
    </button>
    <aside class="sidebar">
      <!-- Sidebar Header -->
      <header class="sidebar-header">
        <a href="#" class="header-logo">
        <!-- <img src="ok.jpeg" height="200px" width="200px" alt="CodingNepal"> -->
<b>BizGenius AI</b>
    </a>
        <button class="sidebar-toggler">
          <span class="material-symbols-rounded">chevron_left</span>
        </button>
      </header>
      <nav class="sidebar-nav">
        <!-- Primary Top Nav -->
        <ul class="nav-list primary-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
             
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Dashboard</a></li>
            </ul>
          </li>
          <!-- Dropdown -->
          <li class="nav-item dropdown-container">
            <a href="http://localhost/Brainwave-main/home.php" class="nav-link dropdown-toggle">
              <span class="material-symbols-rounded">calendar_today</span>
              <span class="nav-label">Ai Campaign Generator</span>
            </a>
            <!-- Dropdown Menu -->
            <ul class="dropdown-menu">
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="http://localhost/Brainwave-main/success.php" class="nav-link">
              <span class="material-symbols-rounded">notifications</span>
              <span class="nav-label">Success Predictor</span>
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Notifications</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Resources</a></li>
            </ul>
          </li>
          <!-- Dropdown -->
          <li class="nav-item dropdown-container">
            <a href="#" class="nav-link dropdown-toggle">
              <span class="material-symbols-rounded">star</span>
              <span class="nav-label">Loyalty Optimizer</span>
             
            </a>
            <!-- Dropdown Menu -->
            <ul class="dropdown-menu">
              </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="material-symbols-rounded">extension</span>
              <span class="nav-label">Ethics & Sustainability</span>
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Extensions</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="material-symbols-rounded">settings</span>
              <span class="nav-label">Impact Report</span>
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Settings</a></li>
            </ul>
          </li>
        </ul>
        <!-- Secondary Bottom Nav -->
        <ul class="nav-list secondary-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="material-symbols-rounded">help</span>
              <span class="nav-label">Support</span>
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Support</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="material-symbols-rounded">logout</span>
              <span class="nav-label">Sign Out</span>
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link dropdown-title">Sign Out</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
    <!-- Script -->
    <script src="script1.js"></script>
    <div class="container">
    <br><br> <br><br> <br><br>
        <div class="text">AI Campaign Generator</div>
        
        <form action="" method="POST">
    <div class="form-row">
        <div class="input-data">
            <input type="text" id="brand-input" name="brand" required>
            <div class="underline"></div>
            <label for="brand-input">Brand</label>
        </div>
        <div class="input-data">
            <input type="text" id="audience-input" name="target_audience" required>
            <div class="underline"></div>
            <label for="audience-input">Targeting audience</label>
        </div>
    </div>
    <div class="form-row">
        <div class="input-data">
            <input type="text" id="budget-input" name="budget" required>
            <div class="underline"></div>
            <label for="budget-input">Budget</label>
        </div>
        <div class="input-data">
            <input type="text" id="product-input" name="product_name" required>
            <div class="underline"></div>
            <label for="product-input">Product Name</label>
        </div>
    </div>
    <div class="form-row">
        <div class="input-data textarea">
            <textarea id="description-textarea" name="product_description" rows="8" cols="80" required></textarea>
            <br>
            <div class="underline"></div>
            <label for="description-textarea">Product Description</label>
        </div>
    </div>
    <div class="form-row submit-btn">
        <div class="input-data">
            <div class="inner"></div>
            <input type="submit" value="Submit">

            <br><br>
        </div>
        <br><br> <br><br> 
    </div>
</form>
<br><br>

        <!-- Add this output container below your form -->
        <div id="output" style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; background: #f9f9f9;"><?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
        <h3>Social media Post Description :</h3>
        <p><?php echo htmlspecialchars($worqhat_result1); ?></p>
    <?php endif; ?></div>



    <br><br>

<br><br>

        <!-- Add this output container below your form -->
        <div id="output" style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; background: #f9f9f9;">
    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
        <h3>Social media post: </h3>

        <?php if (!empty($worqhat_result3)): ?><img src="<?php echo htmlspecialchars($worqhat_result3); ?>" alt="Generated Image" width="300" height="300">

        <?php endif; ?>

    <?php endif; ?>
</div>




    <br><br>


    <br><br>

<!-- Add this output container below your form -->
<div id="output" style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; background: #f9f9f9;"><?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
<h3>Email </h3>
<p><?php echo htmlspecialchars($worqhat_result2); ?></p>
<?php endif; ?></div>



<br><br>

<br><br>


<br><br>
    <br><br>


    <br><br>
    <br><br>


    <br><br>
    <br><br>


    <br><br>
    <br><br>


    <br><br>
    <br><br>


    <br><br>
    <br><br>


    <br><br>
    <br><br>


    <br><br>

    <br><br>


    <br><br>
    <br><br>


    <br><br>
  </body>
</html>
















