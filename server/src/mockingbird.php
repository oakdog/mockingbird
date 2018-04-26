<?php
require_once('./codebird.php');

\Codebird\Codebird::setConsumerKey(
  "removed_for_github",
  "removed_for_github"
); // static, see README

$cb = \Codebird\Codebird::getInstance();
$cb->setToken(
  "removed_for_github",
  "removed_for_github"
);
//$cb->setUseCurl(false);
$cb->setConnectionTimeout(10000);
$cb->setTimeout(20000);

$headers = apache_request_headers();
if ( isset($headers['x-q']) && isset($headers['x-count']) ){
  $query = $headers['x-q'];
  $count = $headers['x-count'];
} else if ( isset($headers['X-Q']) && isset($headers['X-Count']) ){
  $query = $headers['X-Q'];
  $count = $headers['X-Count'];
} else {
  echo json_encode( $headers );
  $cb->logout();
  exit();
}
$params = array(
  'q'=>$query,
  'count'=>$count
);
echo json_encode( $cb->search_tweets($params) );
$cb->logout();
?>
