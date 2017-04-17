# Schema Information

## users		
column name | data type | details
-|-|-
id | integer | not null, primary key
username | string | not null, indexed, unique
password_digest | string | not null
session_token | string | not null, indexed, unique
image_url | string |
bio | text |
location | string |

## sounds		
column name | data type | details
-|-|-
id | integer | not null, primary key
title | string | not null
length | integer | not null
stream_url | string | not null
download_url | string | not null
collection_id | integer | not null, foreign key

## collections		
column name | data type | details
-|-|-
id | integer | not null, primary key
title | string | not null
artwork_url | string |
description | text |
user_id | integer | not null, foreign key

# bonus		

## tags		
column name | data type | details
-|-|-
id | integer | not null, primary key
name | string | not null

## taggings		
column name | data type | details
-|-|-
id | integer | not null, primary key
tag_id | integer | not null, foreign key, indexed
collection_id | integer | not null, foreign key, indexed

## follows		
column name | data type | details
-|-|-
id | integer | not null, primary key
follower_id | integer | not null, foreign key, indexed
followee_id | integer | not null, foreign key, indexed
