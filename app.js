const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

// URL of the page we want to scrape
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

async function scrapeData() {
    try {
        // fetch HTML of the page we want to scrape
        const {data} = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const listItem = $('.plainlist ul li');
        //  Stores data for all countries
        const countries = [];
        // Use .each method to loop trough the li we selected
        listItem.each((idx, el)=>{
            // Object holding data for each country/jurisdiction
            const country = {name: "", iso3: ""};
             // Select the text content of a and span elements
            // Store the textcontent in the above object
            country.name = $(el).children('a').text();
            country.iso3 = $(el).children('span').text();
            // Populate countries array with country data
            countries.push(country);
        });
        // Log countries array to the trminal
        console.dir(countries);
        // Write countries array in countries.json file
        fs.writeFile('countries.json', JSON.stringify(countries, null, 2), (err)=>{
            if(err) {
                console.log(err);
                return;
            }
            console.log('Successfully written data to file');
        })
    } catch (err) {
        console.log(err);
    }
}

scrapeData();
















































// const axios = require('axios');
// const cheerio = require('cheerio');
// const pretty = require('pretty');

// // Markup yang akan kita gunakan
// const markup = `
// <ul class="fruits">
//     <li class="fruits__mango">Mango</li>
//     <li class="fruits__apple">Aple</li>
// </ul>
// `;

// // Load Markup chherio
// const $ = cheerio.load(markup);
// // console.log(pretty($.html()));

// // How to Select an Element in Cheerio
// const mango = $('.fruits__mango');
// // console.log(mango.html()); //Mango

// // Get atributes an element in cheerio
// const apple = $('.fruits__apple');
// // console.log(apple.attr('class')); //fruits__apple

// // Loops elemnt li
// const listItem = $('li');
// console.log(listItem.length); //2
// listItem.each(function(i, e){
//     // console.log($(e).text());
// }); 
// //mango
// //apple

// // Append and Prepend element to markup in cheerio
// const ul = $('ul');
// ul.append('<li>Banana</li>');
// ul.prepend('<li>Pineapple</li>');
// console.log(pretty($.html()));