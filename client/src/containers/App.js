import React, { Component, Fragment } from 'react';
import './App.css';
import TopBar from "../components/TopBar";
import ItemList from "./ItemList";
import { Typography } from '@material-ui/core';
//import Details from '../components/Details';

//const mockResults = [{ "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "imdbID": "tt0076759", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode V - The Empire Strikes Back", "Year": "1980", "imdbID": "tt0080684", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VI - Return of the Jedi", "Year": "1983", "imdbID": "tt0086190", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VII - The Force Awakens", "Year": "2015", "imdbID": "tt2488496", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode I - The Phantom Menace", "Year": "1999", "imdbID": "tt0120915", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode III - Revenge of the Sith", "Year": "2005", "imdbID": "tt0121766", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode II - Attack of the Clones", "Year": "2002", "imdbID": "tt0121765", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg" }, { "Title": "Star Trek", "Year": "2009", "imdbID": "tt0796366", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg" }, { "Title": "Rogue One: A Star Wars Story", "Year": "2016", "imdbID": "tt3748528", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VIII - The Last Jedi", "Year": "2017", "imdbID": "tt2527336", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg" }];
//const mockResults = [{ "Title": "The Blue Umbrella", "Year": "2013", "imdbID": "tt2616880", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTUxMDczNTI3OF5BMl5BanBnXkFtZTcwNjY3MTExOQ@@._V1_SX300.jpg" }, { "Title": "The Umbrella Coup", "Year": "1980", "imdbID": "tt0080565", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZTM0NGIzOTQtYjU0Ni00N2E0LTgzMGItNGIzZTFkZmVkYzY1XkEyXkFqcGdeQXVyNjI5NTk0MzE@._V1_SX300.jpg" }, { "Title": "The Blue Umbrella", "Year": "2005", "imdbID": "tt0457802", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZGJiZTRlM2UtN2IyOC00Yzk1LWE5ZTktYWM3ZWEwYWZiMWI0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg" }, { "Title": "Resident Evil: The Umbrella Chronicles", "Year": "2007", "imdbID": "tt1087900", "Type": "game", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZmRkNWE2Y2YtYmMwOS00ZjYwLTljYjYtYjkxZmUwNmYyNTBkXkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_SX300.jpg" }, { "Title": "The Umbrella Man", "Year": "2011", "imdbID": "tt2120843", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BNmY5MzFhNzAtNmJkMi00YWM0LTg5ZjEtNWY3NTM4ZDc3MmJkXkEyXkFqcGdeQXVyMjM3ODA2NDQ@._V1_SX300.jpg" }, { "Title": "Ten Ladies in One Umbrella", "Year": "1903", "imdbID": "tt0223884", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BY2Y5MzgwN2ItZTVkYS00OWFiLWI1NGItMjhmNDcwMmU3ZWY2XkEyXkFqcGdeQXVyNTI2NTY2MDI@._V1_SX300.jpg" }, { "Title": "The Umbrella Factory", "Year": "2013", "imdbID": "tt3062878", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BMTQ0NTU4OTQ2OF5BMl5BanBnXkFtZTgwNzE5OTAwMDE@._V1_SX300.jpg" }, { "Title": "Rihanna Feat. Jay Z: Umbrella", "Year": "2007", "imdbID": "tt6667916", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZDdjMmI0NzYtNGI5Ny00YThhLTg4ZWEtOTVkNDM1ZWRkMTc4XkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_SX300.jpg" }, { "Title": "St. Peter's Umbrella", "Year": "1958", "imdbID": "tt0052263", "Type": "movie", "Poster": "N/A" }, { "Title": "An Umbrella for Two", "Year": "1999", "imdbID": "tt1641614", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDI5YTA3NWQtZTE5YS00NzRjLTliNDMtZWQ4ZWU0ZmRiNzM1XkEyXkFqcGdeQXVyMTAyNTQ0MTk@._V1_SX300.jpg" }];
const mockResults = [
  {
    original_name: "Star Wars: The Clone Wars",
    id: 4194,
    media_type: "tv",
    name: "Star Wars: The Clone Wars",
    vote_count: 160,
    vote_average: 7.49,
    poster_path: "/p6s2svEHHLsQ1TOw4Si54c1dD5L.jpg",
    first_air_date: "2008-10-03",
    popularity: 39.764,
    genre_ids: [
      10759,
      16,
      10765
    ],
    original_language: "en",
    backdrop_path: "/gAlEO2hFU29uFv6RcC7efps0iL9.jpg",
    overview: "Yoda, Obi-Wan Kenobi, Anakin Skywalker, Mace Windu and other Jedi Knights lead the Grand Army of the Republic against the droid army of the Separatists.",
    origin_country: [
      "SG",
      "US"
    ]
  },
  {
    vote_average: 8.2,
    vote_count: 10866,
    id: 11,
    video: false,
    media_type: "movie",
    title: "Star Wars",
    popularity: 37.085,
    poster_path: "/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
    original_language: "en",
    original_title: "Star Wars",
    genre_ids: [
      12,
      28,
      878
    ],
    backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
    adult: false,
    overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    release_date: "1977-05-25"
  },
  {
    original_name: "Star Wars Rebels",
    id: 60554,
    media_type: "tv",
    name: "Star Wars Rebels",
    vote_count: 153,
    vote_average: 7.13,
    poster_path: "/dfzbkhKMnkdwiG1AAIJnrc9SDdY.jpg",
    first_air_date: "2014-10-13",
    popularity: 27.411,
    genre_ids: [
      10759,
      16
    ],
    original_language: "en",
    backdrop_path: "/2haokMQ2dFQK2z1R9gZrH9qAeqk.jpg",
    overview: "Set between the events of Star Wars: Episodes III and IV, the story unfolds during a dark time when the evil Galactic Empire is tightening its grip of power on the galaxy. Imperial forces have occupied a remote planet and are ruining the lives of its people. The motley but clever crew of the starship Ghost — cowboy Jedi Kanan, ace pilot Hera, street-smart teenager Ezra, the “muscle” Zeb, warrior firebrand Sabine, and cantankerous old astromech droid Chopper — is among a select few who are brave enough to stand against the Empire. Together, they will face threatening new villains, encounter colorful adversaries, embark on thrilling adventures, and become heroes with the power to ignite a rebellion.",
    origin_country: [
      "US"
    ]
  },
  {
    original_name: "Star Wars Resistance",
    id: 79093,
    media_type: "tv",
    name: "Star Wars Resistance",
    vote_count: 5,
    vote_average: 6.8,
    poster_path: "/hHPbh6mJkpxGREMKgJ9FpZNlxPd.jpg",
    first_air_date: "2018-10-07",
    popularity: 15.114,
    genre_ids: [
      10765,
      16,
      10759
    ],
    original_language: "en",
    backdrop_path: "/4y3J0MN84Ylqy5Vc4cwE6Zdga99.jpg",
    overview: "Kazuda Xiono, a young pilot for the Resistance, is tasked with a top secret mission to investigate the First Order, a growing threat in the galaxy.",
    origin_country: [
      "US"
    ]
  },
  {
    original_name: "Star Wars: Clone Wars",
    id: 3122,
    media_type: "tv",
    name: "Star Wars: Clone Wars",
    vote_count: 47,
    vote_average: 7.25,
    poster_path: "/3Uv9vwC8t8h9YXALdZFzDNihfku.jpg",
    first_air_date: "2003-11-07",
    popularity: 7.458,
    genre_ids: [
      10759,
      16
    ],
    original_language: "en",
    backdrop_path: "/3cm01zF1SBEhYfmpsPiDqIe2Rcn.jpg",
    overview: "Star Wars: Clone Wars is an Emmy Award- and Annie Award-winning American animated microseries set in the Star Wars universe. Chronologically, the series takes place during the three-year time period between the prequel films Attack of the Clones and Revenge of the Sith. The show depicted the actions of various characters in the Star Wars prequel trilogy, including Anakin Skywalker, Obi-Wan Kenobi, Mace Windu, and other Knights of the Jedi Order during the conflict, leading the clone trooper forces of the Galactic Republic against the battle droid armies of the Confederacy of Independent Systems and the Sith.",
    origin_country: [
      "US"
    ]
  },
  {
    vote_average: 6.6,
    vote_count: 3341,
    id: 348350,
    video: false,
    media_type: "movie",
    title: "Solo: A Star Wars Story",
    popularity: 41.425,
    poster_path: "/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg",
    original_language: "en",
    original_title: "Solo: A Star Wars Story",
    genre_ids: [
      28,
      12,
      878
    ],
    backdrop_path: "/pH0rtDSgBM98Ho8HgiEq8topsxL.jpg",
    adult: false,
    overview: "Through a series of daring escapades deep within a dark and dangerous criminal underworld, Han Solo meets his mighty future copilot Chewbacca and encounters the notorious gambler Lando Calrissian.",
    release_date: "2018-05-15"
  },
  {
    vote_average: 7,
    vote_count: 7990,
    id: 181808,
    video: false,
    media_type: "movie",
    title: "Star Wars: The Last Jedi",
    popularity: 35.507,
    poster_path: "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    original_language: "en",
    original_title: "Star Wars: The Last Jedi",
    genre_ids: [
      14,
      12,
      878,
      28
    ],
    backdrop_path: "/baNQpUlmX8shVmJBGHMSL5Y6MBl.jpg",
    adult: false,
    overview: "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
    release_date: "2017-12-13"
  },
  {
    vote_average: 7.4,
    vote_count: 12134,
    id: 140607,
    video: false,
    media_type: "movie",
    title: "Star Wars: The Force Awakens",
    popularity: 29.106,
    poster_path: "/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg",
    original_language: "en",
    original_title: "Star Wars: The Force Awakens",
    genre_ids: [
      28,
      12,
      878,
      14
    ],
    backdrop_path: "/njv65RTipNSTozFLuF85jL0bcQe.jpg",
    adult: false,
    overview: "Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
    release_date: "2015-12-15"
  },
  {
    vote_average: 0,
    vote_count: 0,
    id: 181812,
    video: false,
    media_type: "movie",
    title: "Star Wars: Episode IX",
    popularity: 11.231,
    poster_path: "/yVYTFvIiKyr6vsrPw3o5C6t2eoL.jpg",
    original_language: "en",
    original_title: "Star Wars: Episode IX",
    genre_ids: [
      878,
      14,
      28,
      12,
      10752
    ],
    backdrop_path: "/i0NGCiMxL4NIVk2hhjtVgnNYZ3a.jpg",
    adult: false,
    overview: "The next installment in the franchise and the conclusion of the “Star Wars“ sequel trilogy as well as the “Skywalker Saga“.",
    release_date: "2019-12-18"
  },
  {
    vote_average: 5.9,
    vote_count: 758,
    id: 12180,
    video: false,
    media_type: "movie",
    title: "Star Wars: The Clone Wars",
    popularity: 8.707,
    poster_path: "/xd6yhmtS6mEURZLwUDT5raEMbf.jpg",
    original_language: "en",
    original_title: "Star Wars: The Clone Wars",
    genre_ids: [
      16,
      28,
      878,
      12
    ],
    backdrop_path: "/gmLMaDXi4lFWG8WitaCYOJS5GtL.jpg",
    adult: false,
    overview: "Set between Episode II and III the Clone Wars is the first computer animated Star Wars film. Anakin and Obi Wan must find out who kidnapped Jabba the Hutts son and return him safely. The Seperatists will try anything to stop them and ruin any chance of a diplomatic agreement between the Hutt's and the Republic.",
    release_date: "2008-08-05"
  },
  {
    original_name: "Star Wars: Forces of Destiny",
    id: 71412,
    media_type: "tv",
    name: "Star Wars: Forces of Destiny",
    vote_count: 5,
    vote_average: 4.8,
    poster_path: "/a5d2y264VgYUvpKUNNT6EbL1Cwb.jpg",
    first_air_date: "2017-07-03",
    popularity: 6.69,
    genre_ids: [
      10765,
      16,
      10759,
      10751
    ],
    original_language: "en",
    backdrop_path: "/rfxCWSwzkeeQne9Mb8kNPDqZYBC.jpg",
    overview: "An animated micro-series starring Rey, Jyn Erso, Princess Leia, Ahsoka Tano, and more. Small moments and everyday decisions shape a larger heroic saga.",
    origin_country: [
      "US"
    ]
  },
  {
    vote_average: 7.5,
    vote_count: 8870,
    id: 330459,
    video: false,
    media_type: "movie",
    title: "Rogue One: A Star Wars Story",
    popularity: 20.445,
    poster_path: "/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg",
    original_language: "en",
    original_title: "Rogue One: A Star Wars Story",
    genre_ids: [
      28,
      12,
      878
    ],
    backdrop_path: "/tZjVVIYXACV4IIIhXeIM59ytqwS.jpg",
    adult: false,
    overview: "A rogue band of resistance fighters unite for a mission to steal the Death Star plans and bring a new hope to the galaxy.",
    release_date: "2016-12-14"
  },
  {
    original_name: "Lego Star Wars: Droid Tales",
    id: 63722,
    media_type: "tv",
    name: "Lego Star Wars: Droid Tales",
    vote_count: 9,
    vote_average: 5.38,
    poster_path: "/2eSTFO6PimOGORZrhjlyU2hqeiR.jpg",
    first_air_date: "2015-10-05",
    popularity: 6.401,
    genre_ids: [
      16
    ],
    original_language: "en",
    backdrop_path: "/5NCO3bOn8N8cMaJAxKNtpaBZPZH.jpg",
    overview: "Following their victory celebration in the Ewok village on Endor, seen at the close of Star Wars: Return of the Jedi, C-3PO and R2-D2 have gathered to regale Luke, Leia, Han, Chewbacca and the other Rebels with the tales of their adventures that led to the events of Star Wars: The Phantom Menace. An accidental kidnapping occurs while the droids are reminiscing and suddenly viewers are taken on a new adventure that leads to encounters with familiar faces and places that prompt the re-telling of the entire saga. The series offers all of the playful humor that viewers expect from LEGO Star Wars.",
    origin_country: [
      "US"
    ]
  },
  {
    vote_average: 6.4,
    vote_count: 7532,
    id: 1893,
    video: false,
    media_type: "movie",
    title: "Star Wars: Episode I - The Phantom Menace",
    popularity: 21.86,
    poster_path: "/n8V09dDc02KsSN6Q4hC2BX6hN8X.jpg",
    original_language: "en",
    original_title: "Star Wars: Episode I - The Phantom Menace",
    genre_ids: [
      12,
      28,
      878
    ],
    backdrop_path: "/v6lRzOActebITc9rizhNAdwQR1O.jpg",
    adult: false,
    overview: "Anakin Skywalker, a young slave strong with the Force, is discovered on Tatooine. Meanwhile, the evil Sith have returned, enacting their plot for revenge against the Jedi.",
    release_date: "1999-05-19"
  },
  {
    vote_average: 6.5,
    vote_count: 6804,
    id: 1894,
    video: false,
    media_type: "movie",
    title: "Star Wars: Episode II - Attack of the Clones",
    popularity: 17.514,
    poster_path: "/2vcNFtrZXNwIcBgH5e2xXCmVR8t.jpg",
    original_language: "en",
    original_title: "Star Wars: Episode II - Attack of the Clones",
    genre_ids: [
      12,
      28,
      878
    ],
    backdrop_path: "/1Slt26IGf2XHqv8xjEJ7LMZqCYb.jpg",
    adult: false,
    overview: "Ten years after the invasion of Naboo, the galaxy is on the brink of civil war. Under the leadership of a renegade Jedi named Count Dooku, thousands of solar systems threaten to break away from the Galactic Republic. When an assassination attempt is made on Senator Padmé Amidala, the former Queen of Naboo, twenty-year-old Jedi apprentice Anakin Skywalker is assigned to protect her. In the course of his mission, Anakin discovers his love for Padmé as well as his own darker side. Soon, Anakin, Padmé, and Obi-Wan Kenobi are drawn into the heart of the Separatist movement and the beginning of the Clone Wars.",
    release_date: "2002-05-15"
  },
  {
    vote_average: 7.3,
    vote_count: 100,
    id: 42979,
    video: false,
    media_type: "movie",
    title: "Robot Chicken: Star Wars",
    popularity: 5.531,
    poster_path: "/kWKspQ7YiQ82xXM1jVbIbqh5OyV.jpg",
    original_language: "en",
    original_title: "Robot Chicken: Star Wars",
    genre_ids: [
      16,
      35,
      878
    ],
    backdrop_path: "/gZxY7VDOI48gjhnDJK1E6n9uHWk.jpg",
    adult: false,
    overview: "Fans of Adult Swim's \"Robot Chicken\" and the Star Wars movie franchise won't want to miss this collection of 30 sketches. This hilarious compilation features an array of skits -- such as \"Darth Vader's Collect Call\" and \"Inside the AT-AT\" -- as well as the incredible voice talents of Hulk Hogan, Malcolm McDowell, Conan O'Brien and even the original Luke Skywalker himself, Mark Hamill.",
    release_date: "2007-07-17"
  },
  {
    vote_average: 3,
    vote_count: 171,
    id: 74849,
    video: false,
    media_type: "movie",
    title: "The Star Wars Holiday Special",
    popularity: 7.947,
    poster_path: "/sNxgvnswaahOA3mdkjcuYYpLi7i.jpg",
    original_language: "en",
    original_title: "The Star Wars Holiday Special",
    genre_ids: [
      12,
      35,
      10751,
      878,
      10770
    ],
    backdrop_path: "/ie6u0zegHcVJEtHSpYn0KgEogrD.jpg",
    adult: false,
    overview: "Luke Skywalker and Han Solo battle evil Imperial forces to help Chewbacca reach his imperiled family on the Wookiee planet - in time for Life Day, their most important day of the year!",
    release_date: "1978-12-01"
  },
  {
    vote_average: 7.2,
    vote_count: 7064,
    id: 1895,
    video: false,
    media_type: "movie",
    title: "Star Wars: Episode III - Revenge of the Sith",
    popularity: 15.111,
    poster_path: "/tgr5Pdy7ehZYBqBkN2K7Q02xgOb.jpg",
    original_language: "en",
    original_title: "Star Wars: Episode III - Revenge of the Sith",
    genre_ids: [
      878,
      12,
      28
    ],
    backdrop_path: "/wUYTfFbfPiZC6Lcyt1nonr69ZmK.jpg",
    adult: false,
    overview: "Years after the onset of the Clone Wars, the noble Jedi Knights lead a massive clone army into a galaxy-wide battle against the Separatists. When the sinister Sith unveil a thousand-year-old plot to rule the galaxy, the Republic crumbles and from its ashes rises the evil Galactic Empire. Jedi hero Anakin Skywalker is seduced by the dark side of the Force to become the Emperor's new apprentice – Darth Vader. The Jedi are decimated, as Obi-Wan Kenobi and Jedi Master Yoda are forced into hiding. The only hope for the galaxy are Anakin's own offspring – the twin children born in secrecy who will grow up to become heroes.",
    release_date: "2005-05-17"
  },
  {
    original_name: "Star Wars: Droids",
    id: 25,
    media_type: "tv",
    name: "Star Wars: Droids",
    vote_count: 11,
    vote_average: 4.27,
    poster_path: "/wajb1xWweHREBxWl58gE1QKjoTy.jpg",
    first_air_date: "1985-09-07",
    popularity: 2.422,
    genre_ids: [
      10762,
      16,
      35,
      10759
    ],
    original_language: "en",
    backdrop_path: "/5AS13jFoVGB7fq5p4HVONKPjxQd.jpg",
    overview: "Star Wars: Droids, also known as Droids: The Adventures of R2-D2 and C-3PO, and 2004 re-released on DVD as Star Wars Animated Adventures: Droids, is an animated television series that features the exploits of R2-D2 and C-3PO, the droids who have appeared in all six Star Wars films. The series takes place between the events depicted in Star Wars Episode III: Revenge of the Sith and Star Wars Episode IV: A New Hope. Over the course of the series, the droids team up with four different sets of masters. The series is divided up into three cycles: at the beginning of each, the droids usually run into their new masters in an accidental way, and at the end of each cycle, they usually are forced to leave their masters for one reason or another. The Great Heep, a television special following the series, served as a prequel to the third Mungo Baobab cycle. The series' opening theme, \"Trouble Again,\" was performed by Stewart Copeland of the Police and written by Copeland and Derek Holt.",
    origin_country: [
      "US",
      "CA"
    ]
  },
  {
    original_name: "Lego Star Wars: The Yoda Chronicles",
    id: 61513,
    media_type: "tv",
    name: "Lego Star Wars: The Yoda Chronicles",
    vote_count: 5,
    vote_average: 6.1,
    poster_path: "/1S1j1QxwLNPNiUrq8GSg05KkAmY.jpg",
    first_air_date: "2013-05-29",
    popularity: 3.62,
    genre_ids: [
      10765,
      10759
    ],
    original_language: "en",
    backdrop_path: "/cogF5KmbzRUlbegpRZstmrKZLOs.jpg",
    overview: "Yoda begins by training Padawans at the Jedi Temple Academy, but then he feels a disturbance in the Force and rushes off to fight the Dark Side.",
    origin_country: [
      "US"
    ]
  }];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      searchField: "",
      searchResults: mockResults,
    };
  }

  onSearch = () => {
    fetch(`/api/searchmovies/${this.state.searchField}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.page) {
          this.setState({ searchResults: data.results, errorMessage: "" });
        } else {
          this.setState({ errorMessage: data.status_message });
        }
      })
      .catch(err => this.setState({ errorMessage: err }));
  }

  onType = (event) => {
    this.setState({ searchField: event.target.value });
  }

  renderResults = () => {
    const { searchResults } = this.state
    if (this.state.errorMessage) {
      return <Typography variant="h5" align="center">Error: {this.state.errorMessage}</Typography>;
    } else {
      return <ItemList items={searchResults} />;
    }
  }

  render() {
    return (
      <Fragment>
        <TopBar onSearch={this.onSearch} onType={this.onType} />
        {/* <Details info={this.state.info} detailsOpen={this.state.detailsOpen} onDetailsClose={this.onDetailsClose} /> */}
        {this.renderResults()}
      </Fragment>
    );
  }
}

export default App;
