drop function if exists increment_images_ref_count;
drop function if exists decrement_images_ref_count;
drop function if exists increment_audio_ref_count;
drop function if exists decrement_audio_ref_count;
drop function if exists increment_translations_ref_count;
drop function if exists decrement_translations_ref_count;
drop function if exists clear_sentence_entity;

create function increment_images_ref_count (s_id int) 
returns void as
$$
  update sentence_entities 
  set images_count = images_count + 1
  where id = s_id
$$ 
language sql volatile;

create function decrement_images_ref_count (s_id int) 
returns void as
$$
  update sentence_entities 
  set images_count = images_count - 1
  where id = s_id
$$ 
language sql volatile;

create function increment_audio_ref_count (s_id int) 
returns void as
$$
  update sentence_entities 
  set audio_count = audio_count + 1
  where id = s_id
$$ 
language sql volatile;

create function decrement_audio_ref_count (s_id int) 
returns void as
$$
  update sentence_entities 
  set audio_count = audio_count - 1
  where id = s_id
$$ 
language sql volatile;

create function increment_translations_ref_count (s_id int) 
returns void as
$$
  update sentence_entities 
  set translations_count = translations_count + 1
  where id = s_id
$$ 
language sql volatile;

create function decrement_translations_ref_count (s_id int) 
returns void as
$$
  update sentence_entities 
  set translations_count = translations_count - 1
  where id = s_id
$$ 
language sql volatile;


create function clear_sentence_entity () 
returns void as
$$
  delete from sentence_entities 
  where images_count = 0 and audio_count = 0 and translations_count = 0;
$$ 
language sql volatile;