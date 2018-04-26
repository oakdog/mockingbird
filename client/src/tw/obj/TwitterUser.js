/*
id 	Int64  : The integer representation of the unique identifier for this User. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in interpreting it. Using a signed 64 bit integer for storing this identifier is safe. Use id_str for fetching the identifier to stay on the safe side. See Twitter IDs, JSON and Snowflake .

id_str 	String : The string representation of the unique identifier for this User. Implementations should use this rather than the large, possibly un-consumable integer in id.

name 	String : The name of the user, as they’ve defined it. Not necessarily a person’s name. Typically capped at 20 characters, but subject to change.

screen_name 	String : The screen name, handle, or alias that this user identifies themselves with. screen_names are unique but subject to change. Use id_str as a user identifier whenever possible. Typically a maximum of 15 characters long, but some historical accounts may exist with longer names.

location 	String : Nullable . The user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable. This field will occasionally be fuzzily interpreted by the Search service.

url 	String : Nullable . A URL provided by the user in association with their profile.

description 	String : Nullable . The user-defined UTF-8 string describing their account.

derived 	Arrays of Enrichment Objects : Collection of Enrichment metadata derived for user. Provides the Profile Geo and Klout Enrichment metadata. See referenced documentation for more information, including JSON data dictionaries.

protected 	Boolean : When true, indicates that this user has chosen to protect their Tweets. See About Public and Protected Tweets .

verified 	Boolean : When true, indicates that the user has a verified account. See Verified Accounts .

followers_count 	Int : The number of followers this account currently has. Under certain conditions of duress, this field will temporarily indicate “0”.

friends_count 	Int : The number of users this account is following (AKA their “followings”). Under certain conditions of duress, this field will temporarily indicate “0”.

listed_count 	Int : The number of public lists that this user is a member of.

favourites_count 	Int : The number of Tweets this user has liked in the account’s lifetime. British spelling used in the field name for historical reasons.

statuses_count 	Int : The number of Tweets (including retweets) issued by the user.

created_at 	String : The UTC datetime that the user account was created on Twitter.

utc_offset 	Int : Nullable . The offset from GMT/UTC in seconds.

time_zone 	String : Nullable . A string describing the Time Zone this user declares themselves within.

geo_enabled 	Boolean : When true, indicates that the user has enabled the possibility of geotagging their Tweets. This field must be true for the current user to attach geographic data when using POST statuses / update .

lang 	String : The BCP 47 code for the user’s self-declared user interface language. May or may not have anything to do with the content of their Tweets. Examples:

contributors_enabled 	Boolean : Indicates that the user has an account with “contributor mode” enabled, allowing for Tweets issued by the user to be co-authored by another account. Rarely true (this is a legacy field)

profile_background_color 	String : The hexadecimal color chosen by the user for their background.

profile_background_image_url String : A HTTP-based URL pointing to the background image the user has uploaded for their profile.

profile_background_image_url_https String : A HTTPS-based URL pointing to the background image the user has uploaded for their profile.

profile_background_tile 	Boolean : When true, indicates that the user’s profile_background_image_url should be tiled when displayed.

profile_banner_url 	String : The HTTPS-based URL pointing to the standard web representation of the user’s uploaded profile banner. By adding a final path element of the URL, it is possible to obtain different image sizes optimized for specific displays. For size variants, please see User Profile Images and Banners .

profile_image_url 	String : A HTTP-based URL pointing to the user’s profile image. See User Profile Images and Banners .

profile_image_url_https 	String : A HTTPS-based URL pointing to the user’s profile image.

profile_link_color 	String : The hexadecimal color the user has chosen to display links with in their Twitter UI.

profile_sidebar_border_color 	String : The hexadecimal color the user has chosen to display sidebar borders with in their Twitter UI.

profile_sidebar_fill_color 	String : The hexadecimal color the user has chosen to display sidebar backgrounds with in their Twitter UI.

profile_text_color 	String : The hexadecimal color the user has chosen to display text with in their Twitter UI.

profile_use_background_image 	Boolean : When true, indicates the user wants their uploaded background image to be used.

default_profile Boolean : When true, indicates that the user has not altered the theme or background of their user profile.

default_profile_image Boolean : When true, indicates that the user has not uploaded their own profile image and a default image is used instead.

withheld_in_countries String : When present, indicates a textual representation of the two-letter country codes this user is withheld from.

withheld_scope 	String : When present, indicates whether the content being withheld is the “status” or a “user.”

*/
import TwitterObject from './TwitterObject';
class TwitterUser {
  constructor(raw){
    const propAttrs = [
      // { name : 'id', type : 'Int64' },
      { name : 'id_str', type : 'String' },
      { name : 'name', type : 'String' },
      { name : 'screen_name', type : 'String' },
      { name : 'location', type : 'String' },
      { name : 'url', type : 'String' },
      { name : 'description', type : 'String' },
      // { name : 'derived', type : 'Array of EnrichmentObjects' },
      { name : 'protected', type : 'Boolean' },
      { name : 'verified', type : 'Boolean' },
      { name : 'followers_count', type : 'Int' },
      { name : 'friends_count', type : 'Int' },
      { name : 'listed_count', type : 'Int' },
      { name : 'favourites_count', type : 'Int' },
      { name : 'statuses_count', type : 'Int' },
      { name : 'created_at', type : 'String' },
      { name : 'utc_offset', type : 'Int' },
      { name : 'time_zone', type : 'String' },
      { name : 'geo_enabled', type : 'Boolean' },
      { name : 'lang', type : 'String' },
      { name : 'contributors_enabled', type : 'Boolean' },
      { name : 'profile_background_color', type : 'String' },
      { name : 'profile_background_image_url', type : 'String' },
      { name : 'profile_background_image_url_https', type : 'String' },
      { name : 'profile_background_tile', type : 'Boolean' },
      { name : 'profile_banner_url', type : 'String' },
      { name : 'profile_image_url', type : 'String' },
      { name : 'profile_image_url_https', type : 'String' },
      { name : 'profile_link_color', type : 'String' },
      { name : 'profile_sidebar_border_color', type : 'String' },
      { name : 'profile_sidebar_fill_color', type : 'String' },
      { name : 'profile_text_color', type : 'String' },
      { name : 'profile_use_background_image', type : 'Boolean' },
      { name : 'default_profile', type : 'Boolean' },
      { name : 'default_profile_image', type : 'Boolean' },
      { name : 'withheld_in_countries', type : 'String' },
      { name : 'withheld_scope', type : 'String' }
    ];
    return TwitterObject.parse(raw,propAttrs);
  }
}

export default TwitterUser;
