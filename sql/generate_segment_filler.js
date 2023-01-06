const fs = require('fs')

const countries = ['en', 'pl', 'hu', 'dk']

const segments = ['home', 'shop', 'street', 'journey', 'party']

let final = 'insert into public.segment_entities (segment_id, country_id) values '
countries.forEach((country, i) => {
  segments.forEach((segment, l) => {
    final += `((select id from public.segments where id = ${l + 1} ),  (select id from public.countries where id = ${i + 1} )),`
  })
})
final = final.slice(0, -1)
final += ';'


fs.writeFile("./segment_entity_filler.sql", final, () => { }); 