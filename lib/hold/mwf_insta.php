<?php
/**
 * Instagram PHP API example usage.
 * This script must be the one receiving the response from
 * instagram's servers after requesting an access token.
 * 
 * For example, if the redirect URI that you set up with instagram
 * is http://example.com/callback.php, this script must be named
 * callback.php and put at the root of your server so the access token
 * can be processed and all the actions executed.
 * 
 * http://example.com/callback.php must be replaced for REDIRECT-URI
 * in the following URI, along with your CLIENT-ID:
 * https://instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token
 * https://api.instagram.com/oauth/authorize/?client_id=e8d6b06f7550461e897b45b02d84c23e&redirect_uri=http://mauriciocuenca.com/qnktwit/confirm.php&response_type=code
 */
session_start();
require_once 'Instagram.php';
error_reporting(E_ERROR | E_PARSE);

/**
 * Configuration params, make sure to write exactly the ones
 * instagram provide you at http://instagr.am/developer/
 */
$config = array(
        'client_id' => 'fea50da776434f7682933f4602ada860',
        'client_secret' => '444c81596b7b4278b3d7611227ee904f',
        'grant_type' => 'authorization_code',
        'redirect_uri' => 'http://markfurrow.dev/lib/mwf_insta.php',
     );

// Instantiate the API handler object
$instagram = new Instagram($config);
$accessToken = $instagram->getAccessToken();
$_SESSION['InstagramAccessToken'] = $accessToken;

$instagram->setAccessToken($_SESSION['InstagramAccessToken']);
$popular = $instagram->getPopularMedia();
$userinfo = $instagram->getUser($_SESSION['InstagramAccessToken']);

// After getting the response, let's iterate the payload
$response = json_decode($popular, true);
$ures     = json_decode($userinfo, true);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="styles.css" />
<title>Instagram API PHP Implementation demo // Popular Media</title>
</head>

<body>

<h1>Popular Media</h1>
<?php // var_dump($userinfo); ?>
<?
    echo $userinfo;
    var_dump($response['data']);
    foreach ($response['data'] as $data) {
        // echo '<pre>' . print_r($data, true) . '</pre>';
        $link = $data['link'];
        $id = $data['id'];
        $caption = $data['caption']['text'];
        $author = $data['caption']['from']['username'];
        $thumbnail = $data['images']['thumbnail']['url'];
    ?>
    <div class="photo">
        <a href="pic.php?id=<?= $id ?>"><span></span><img src="<?= $thumbnail ?>" title="<?= htmlentities($caption) ?>" alt="<?= htmlentities($caption) ?>" /></a>
    </div>
    <?
   }
?>

<p class="footer"><a href="http://www.webdesignerwall.com/tutorials/css-decorative-gallery/">www.webdesignerwall.com/tutorials/css-decorative-gallery/</a></p>

</body>
</html>
<?php die(); ?>
