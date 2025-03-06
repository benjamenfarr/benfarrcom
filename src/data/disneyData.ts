interface DisneyContent {
  show_id: string;
  type: 'Movie' | 'TV Show';
  title: string;
  director: string;
  cast: string;
  country: string;
  date_added: string;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string;
  description: string;
}

export const disneyData: DisneyContent[] = [
  {
    show_id: "s1",
    type: "Movie",
    title: "The Lion King",
    director: "Roger Allers, Rob Minkoff",
    cast: "Matthew Broderick, Jeremy Irons, James Earl Jones",
    country: "United States",
    date_added: "January 28, 2020",
    release_year: 1994,
    rating: "G",
    duration: "88 min",
    listed_in: "Family, Animation, Musical",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself."
  },
  {
    show_id: "s2",
    type: "TV Show",
    title: "The Mandalorian",
    director: "Jon Favreau",
    cast: "Pedro Pascal, Carl Weathers, Gina Carano",
    country: "United States",
    date_added: "November 12, 2019",
    release_year: 2019,
    rating: "TV-14",
    duration: "3 Seasons",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "After the fall of the Empire, a lone gunfighter makes his way through the lawless galaxy with his foundling."
  },
  {
    show_id: "s3",
    type: "Movie",
    title: "Frozen",
    director: "Chris Buck, Jennifer Lee",
    cast: "Kristen Bell, Idina Menzel, Jonathan Groff",
    country: "United States",
    date_added: "June 26, 2020",
    release_year: 2013,
    rating: "PG",
    duration: "102 min",
    listed_in: "Family, Animation, Adventure",
    description: "When their kingdom becomes trapped in perpetual winter, fearless Anna joins forces with mountaineer Kristoff to find Anna's sister, Snow Queen Elsa."
  },
  {
    show_id: "s4",
    type: "Movie",
    title: "Avengers: Endgame",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
    country: "United States",
    date_added: "November 12, 2019",
    release_year: 2019,
    rating: "PG-13",
    duration: "181 min",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more."
  },
  {
    show_id: "s5",
    type: "TV Show",
    title: "WandaVision",
    director: "Matt Shakman",
    cast: "Elizabeth Olsen, Paul Bettany, Kathryn Hahn",
    country: "United States",
    date_added: "January 15, 2021",
    release_year: 2021,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Comedy, Drama, Sci-Fi",
    description: "Wanda Maximoff and Vision—two super-powered beings living idealized suburban lives—begin to suspect that everything is not as it seems."
  },
  {
    show_id: "s6",
    type: "Movie",
    title: "Soul",
    director: "Pete Docter, Kemp Powers",
    cast: "Jamie Foxx, Tina Fey, Graham Norton",
    country: "United States",
    date_added: "December 25, 2020",
    release_year: 2020,
    rating: "PG",
    duration: "100 min",
    listed_in: "Family, Animation, Comedy",
    description: "A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul."
  },
  {
    show_id: "s7",
    type: "TV Show",
    title: "Loki",
    director: "Kate Herron",
    cast: "Tom Hiddleston, Owen Wilson, Gugu Mbatha-Raw",
    country: "United States",
    date_added: "June 9, 2021",
    release_year: 2021,
    rating: "TV-14",
    duration: "2 Seasons",
    listed_in: "Action, Adventure, Fantasy",
    description: "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame."
  },
  {
    show_id: "s8",
    type: "Movie",
    title: "Moana",
    director: "Ron Clements, John Musker",
    cast: "Auli'i Cravalho, Dwayne Johnson, Rachel House",
    country: "United States",
    date_added: "June 28, 2020",
    release_year: 2016,
    rating: "PG",
    duration: "107 min",
    listed_in: "Family, Animation, Adventure",
    description: "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right."
  },
  {
    show_id: "s9",
    type: "TV Show",
    title: "The Falcon and the Winter Soldier",
    director: "Kari Skogland",
    cast: "Anthony Mackie, Sebastian Stan, Wyatt Russell",
    country: "United States",
    date_added: "March 19, 2021",
    release_year: 2021,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Drama",
    description: "Following the events of Avengers: Endgame, Sam Wilson and Bucky Barnes team up in a global adventure that tests their abilities and their patience."
  },
  {
    show_id: "s10",
    type: "Movie",
    title: "Coco",
    director: "Lee Unkrich, Adrian Molina",
    cast: "Anthony Gonzalez, Gael García Bernal, Benjamin Bratt",
    country: "United States",
    date_added: "May 29, 2020",
    release_year: 2017,
    rating: "PG",
    duration: "105 min",
    listed_in: "Family, Animation, Adventure",
    description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer."
  },
  {
    show_id: "s11",
    type: "Movie",
    title: "Black Panther",
    director: "Ryan Coogler",
    cast: "Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o",
    country: "United States",
    date_added: "September 4, 2020",
    release_year: 2018,
    rating: "PG-13",
    duration: "134 min",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and confront a challenger from his country's past."
  },
  {
    show_id: "s12",
    type: "TV Show",
    title: "Hawkeye",
    director: "Rhys Thomas, Bert & Bertie",
    cast: "Jeremy Renner, Hailee Steinfeld, Vera Farmiga",
    country: "United States",
    date_added: "November 24, 2021",
    release_year: 2021,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Crime",
    description: "Former Avenger Clint Barton has a seemingly simple mission: get back to his family for Christmas. Possible? Maybe with the help of Kate Bishop, a 22-year-old archer with dreams of becoming a superhero."
  },
  {
    show_id: "s13",
    type: "Movie",
    title: "Raya and the Last Dragon",
    director: "Don Hall, Carlos López Estrada",
    cast: "Kelly Marie Tran, Awkwafina, Gemma Chan",
    country: "United States",
    date_added: "June 4, 2021",
    release_year: 2021,
    rating: "PG",
    duration: "107 min",
    listed_in: "Family, Animation, Adventure",
    description: "In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon."
  },
  {
    show_id: "s14",
    type: "TV Show",
    title: "What If...?",
    director: "Bryan Andrews",
    cast: "Jeffrey Wright, Chadwick Boseman, Hayley Atwell",
    country: "United States",
    date_added: "August 11, 2021",
    release_year: 2021,
    rating: "TV-14",
    duration: "2 Seasons",
    listed_in: "Animation, Action, Adventure",
    description: "Exploring pivotal moments from the Marvel Cinematic Universe and turning them on their head, leading the audience into uncharted territory."
  },
  {
    show_id: "s15",
    type: "Movie",
    title: "Luca",
    director: "Enrico Casarosa",
    cast: "Jacob Tremblay, Jack Dylan Grazer, Emma Berman",
    country: "United States",
    date_added: "June 18, 2021",
    release_year: 2021,
    rating: "PG",
    duration: "95 min",
    listed_in: "Family, Animation, Comedy",
    description: "On the Italian Riviera, an unlikely but strong friendship grows between a human being and a sea monster disguised as a human."
  },
  {
    show_id: "s16",
    type: "TV Show",
    title: "The Book of Boba Fett",
    director: "Robert Rodriguez, Jon Favreau",
    cast: "Temuera Morrison, Ming-Na Wen, Pedro Pascal",
    country: "United States",
    date_added: "December 29, 2021",
    release_year: 2021,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "Legendary bounty hunter Boba Fett and mercenary Fennec Shand navigate the galaxy's underworld when they return to the sands of Tatooine to stake their claim on the territory once ruled by Jabba the Hutt."
  },
  {
    show_id: "s17",
    type: "Movie",
    title: "Encanto",
    director: "Jared Bush, Byron Howard",
    cast: "Stephanie Beatriz, María Cecilia Botero, John Leguizamo",
    country: "United States",
    date_added: "December 24, 2021",
    release_year: 2021,
    rating: "PG",
    duration: "102 min",
    listed_in: "Family, Animation, Musical",
    description: "A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers."
  },
  {
    show_id: "s18",
    type: "TV Show",
    title: "Moon Knight",
    director: "Mohamed Diab, Justin Benson, Aaron Moorhead",
    cast: "Oscar Isaac, Ethan Hawke, May Calamawy",
    country: "United States",
    date_added: "March 30, 2022",
    release_year: 2022,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Fantasy",
    description: "Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life."
  },
  {
    show_id: "s19",
    type: "Movie",
    title: "Turning Red",
    director: "Domee Shi",
    cast: "Rosalie Chiang, Sandra Oh, Ava Morse",
    country: "United States",
    date_added: "March 11, 2022",
    release_year: 2022,
    rating: "PG",
    duration: "100 min",
    listed_in: "Family, Animation, Comedy",
    description: "A 13-year-old girl named Meilin turns into a giant red panda whenever she gets too excited."
  },
  {
    show_id: "s20",
    type: "TV Show",
    title: "Ms. Marvel",
    director: "Adil El Arbi, Bilall Fallah, Meera Menon",
    cast: "Iman Vellani, Matt Lintz, Zenobia Shroff",
    country: "United States",
    date_added: "June 8, 2022",
    release_year: 2022,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Comedy",
    description: "Kamala Khan, a Muslim American teen growing up in Jersey City, is a superhero mega fan who discovers she has powers of her own."
  },
  {
    show_id: "s21",
    type: "Movie",
    title: "Lightyear",
    director: "Angus MacLane",
    cast: "Chris Evans, Keke Palmer, Peter Sohn",
    country: "United States",
    date_added: "August 3, 2022",
    release_year: 2022,
    rating: "PG",
    duration: "105 min",
    listed_in: "Family, Animation, Adventure",
    description: "While spending years attempting to return home, marooned Space Ranger Buzz Lightyear encounters an army of ruthless robots commanded by Zurg who are attempting to steal his fuel source."
  },
  {
    show_id: "s22",
    type: "TV Show",
    title: "She-Hulk: Attorney at Law",
    director: "Kat Coiro, Anu Valia",
    cast: "Tatiana Maslany, Mark Ruffalo, Tim Roth",
    country: "United States",
    date_added: "August 18, 2022",
    release_year: 2022,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Comedy, Action, Sci-Fi",
    description: "Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered Hulk."
  },
  {
    show_id: "s23",
    type: "Movie",
    title: "Strange World",
    director: "Don Hall",
    cast: "Jake Gyllenhaal, Dennis Quaid, Jaboukie Young-White",
    country: "United States",
    date_added: "December 23, 2022",
    release_year: 2022,
    rating: "PG",
    duration: "102 min",
    listed_in: "Family, Animation, Adventure",
    description: "The legendary Clades are a family of explorers whose differences threaten to topple their latest and most crucial mission."
  },
  {
    show_id: "s24",
    type: "TV Show",
    title: "Andor",
    director: "Toby Haynes, Benjamin Caron, Susanna White",
    cast: "Diego Luna, Kyle Soller, Adria Arjona",
    country: "United States",
    date_added: "September 21, 2022",
    release_year: 2022,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "Prequel series to Star Wars' 'Rogue One'. In an era filled with danger, deception and intrigue, Cassian will embark on the path that is destined to turn him into a Rebel hero."
  },
  {
    show_id: "s25",
    type: "Movie",
    title: "Avatar: The Way of Water",
    director: "James Cameron",
    cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
    country: "United States",
    date_added: "June 7, 2023",
    release_year: 2022,
    rating: "PG-13",
    duration: "192 min",
    listed_in: "Action, Adventure, Fantasy",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."
  },
  {
    show_id: "s26",
    type: "TV Show",
    title: "The Mandalorian",
    director: "Jon Favreau",
    cast: "Pedro Pascal, Carl Weathers, Giancarlo Esposito",
    country: "United States",
    date_added: "March 1, 2023",
    release_year: 2023,
    rating: "TV-14",
    duration: "3 Seasons",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic."
  },
  {
    show_id: "s27",
    type: "Movie",
    title: "Guardians of the Galaxy Vol. 3",
    director: "James Gunn",
    cast: "Chris Pratt, Zoe Saldana, Dave Bautista",
    country: "United States",
    date_added: "August 2, 2023",
    release_year: 2023,
    rating: "PG-13",
    duration: "150 min",
    listed_in: "Action, Adventure, Comedy",
    description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful."
  },
  {
    show_id: "s28",
    type: "TV Show",
    title: "Secret Invasion",
    director: "Ali Selim",
    cast: "Samuel L. Jackson, Ben Mendelsohn, Cobie Smulders",
    country: "United States",
    date_added: "June 21, 2023",
    release_year: 2023,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Drama",
    description: "Nick Fury and Talos discover a faction of shapeshifting Skrulls who have been infiltrating Earth for years."
  },
  {
    show_id: "s29",
    type: "Movie",
    title: "The Little Mermaid",
    director: "Rob Marshall",
    cast: "Halle Bailey, Jonah Hauer-King, Melissa McCarthy",
    country: "United States",
    date_added: "September 6, 2023",
    release_year: 2023,
    rating: "PG",
    duration: "135 min",
    listed_in: "Family, Fantasy, Musical",
    description: "A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince."
  },
  {
    show_id: "s30",
    type: "TV Show",
    title: "Ahsoka",
    director: "Dave Filoni",
    cast: "Rosario Dawson, Natasha Liu Bordizzo, Mary Elizabeth Winstead",
    country: "United States",
    date_added: "August 23, 2023",
    release_year: 2023,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "After the fall of the Galactic Empire, former Jedi Knight Ahsoka Tano investigates an emerging threat to a vulnerable galaxy."
  },
  {
    show_id: "s31",
    type: "Movie",
    title: "Elemental",
    director: "Peter Sohn",
    cast: "Leah Lewis, Mamoudou Athie, Ronnie Del Carmen",
    country: "United States",
    date_added: "September 13, 2023",
    release_year: 2023,
    rating: "PG",
    duration: "101 min",
    listed_in: "Family, Animation, Comedy",
    description: "Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together."
  },
  {
    show_id: "s32",
    type: "TV Show",
    title: "Loki",
    director: "Kate Herron, Justin Benson, Aaron Moorhead",
    cast: "Tom Hiddleston, Owen Wilson, Sophia Di Martino",
    country: "United States",
    date_added: "October 5, 2023",
    release_year: 2023,
    rating: "TV-14",
    duration: "2 Seasons",
    listed_in: "Action, Adventure, Fantasy",
    description: "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame."
  },
  {
    show_id: "s33",
    type: "Movie",
    title: "The Marvels",
    director: "Nia DaCosta",
    cast: "Brie Larson, Teyonah Parris, Iman Vellani",
    country: "United States",
    date_added: "February 7, 2024",
    release_year: 2023,
    rating: "PG-13",
    duration: "105 min",
    listed_in: "Action, Adventure, Sci-Fi",
    description: "Carol Danvers gets her powers entangled with those of Kamala Khan and Monica Rambeau, forcing them to work together to save the universe."
  },
  {
    show_id: "s34",
    type: "TV Show",
    title: "Echo",
    director: "Sydney Freeland, Catriona McKenzie",
    cast: "Alaqua Cox, Chaske Spencer, Tantoo Cardinal",
    country: "United States",
    date_added: "January 9, 2024",
    release_year: 2024,
    rating: "TV-MA",
    duration: "1 Season",
    listed_in: "Action, Crime, Drama",
    description: "Maya Lopez must face her past, reconnect with her Native American roots and embrace the meaning of family and community if she ever hopes to move forward."
  },
  {
    show_id: "s35",
    type: "Movie",
    title: "Wish",
    director: "Chris Buck, Fawn Veerasunthorn",
    cast: "Ariana DeBose, Chris Pine, Alan Tudyk",
    country: "United States",
    date_added: "April 3, 2024",
    release_year: 2023,
    rating: "PG",
    duration: "95 min",
    listed_in: "Family, Animation, Adventure",
    description: "A young girl named Asha wishes on a star and gets a more direct answer than she bargained for when a trouble-making star comes down from the sky to join her."
  },
  {
    show_id: "s36",
    type: "TV Show",
    title: "Percy Jackson and the Olympians",
    director: "James Bobin, Anders Engström",
    cast: "Walker Scobell, Leah Sava Jeffries, Aryan Simhadri",
    country: "United States",
    date_added: "December 19, 2023",
    release_year: 2023,
    rating: "TV-PG",
    duration: "1 Season",
    listed_in: "Action, Adventure, Fantasy",
    description: "A 12-year-old demigod, Percy Jackson, accepts his newfound divine powers and embarks on a quest to find Zeus' stolen lightning bolt and prevent a war among the gods."
  },
  {
    show_id: "s37",
    type: "Movie",
    title: "Inside Out 2",
    director: "Kelsey Mann",
    cast: "Amy Poehler, Phyllis Smith, Lewis Black",
    country: "United States",
    date_added: "July 31, 2024",
    release_year: 2024,
    rating: "PG",
    duration: "96 min",
    listed_in: "Family, Animation, Comedy",
    description: "Riley enters adolescence, and new emotions join the mix, causing chaos in Headquarters."
  },
  {
    show_id: "s38",
    type: "TV Show",
    title: "X-Men '97",
    director: "Jake Castorena, Chase Conley",
    cast: "Ray Chase, Jennifer Hale, Alison Sealy-Smith",
    country: "United States",
    date_added: "March 20, 2024",
    release_year: 2024,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Animation, Action, Adventure",
    description: "Storm and Wolverine try to continue the X-Men after Professor X's departure."
  },
  {
    show_id: "s39",
    type: "Movie",
    title: "Moana 2",
    director: "David Derrick Jr.",
    cast: "Auli'i Cravalho, Dwayne Johnson, Rachel House",
    country: "United States",
    date_added: "November 27, 2024",
    release_year: 2024,
    rating: "PG",
    duration: "110 min",
    listed_in: "Family, Animation, Adventure",
    description: "Moana embarks on a new voyage to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced."
  },
  {
    show_id: "s40",
    type: "TV Show",
    title: "Agatha All Along",
    director: "Jac Schaeffer",
    cast: "Kathryn Hahn, Joe Locke, Patti LuPone",
    country: "United States",
    date_added: "September 18, 2024",
    release_year: 2024,
    rating: "TV-14",
    duration: "1 Season",
    listed_in: "Fantasy, Comedy, Drama",
    description: "Follows Agatha Harkness as she breaks free from a spell and embarks on a dangerous quest with unlikely allies."
  }
];

// Utility functions for data analysis

// Get content distribution by type
export const getContentTypeDistribution = () => {
  const distribution = {
    Movie: 0,
    'TV Show': 0
  };
  
  disneyData.forEach(item => {
    distribution[item.type]++;
  });
  
  return distribution;
};

// Get release year trends
export const getReleaseYearTrends = () => {
  const yearCounts: Record<number, number> = {};
  
  disneyData.forEach(item => {
    if (!yearCounts[item.release_year]) {
      yearCounts[item.release_year] = 0;
    }
    yearCounts[item.release_year]++;
  });
  
  // Sort by year
  const sortedYears = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
  
  return {
    years: sortedYears,
    counts: sortedYears.map(year => yearCounts[year])
  };
};

// Get top genres
export const getTopGenres = (limit: number = 10) => {
  const genreCounts: Record<string, number> = {};
  
  disneyData.forEach(item => {
    const genres = item.listed_in.split(', ');
    genres.forEach(genre => {
      if (!genreCounts[genre]) {
        genreCounts[genre] = 0;
      }
      genreCounts[genre]++;
    });
  });
  
  // Sort by count and get top N
  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  
  return {
    genres: sortedGenres.map(([genre]) => genre),
    counts: sortedGenres.map(([_, count]) => count)
  };
};

// Get rating distribution
export const getRatingDistribution = () => {
  const ratingCounts: Record<string, number> = {};
  
  disneyData.forEach(item => {
    if (!ratingCounts[item.rating]) {
      ratingCounts[item.rating] = 0;
    }
    ratingCounts[item.rating]++;
  });
  
  return Object.entries(ratingCounts).map(([rating, count]) => ({
    rating,
    count
  }));
};

// Get average duration for movies (in minutes)
export const getAverageMovieDuration = () => {
  const movies = disneyData.filter(item => item.type === 'Movie');
  const durations = movies.map(movie => {
    const match = movie.duration.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });
  
  const sum = durations.reduce((acc, curr) => acc + curr, 0);
  return sum / durations.length;
};

// Get season counts for TV shows
export const getTVShowSeasonDistribution = () => {
  const tvShows = disneyData.filter(item => item.type === 'TV Show');
  const seasonCounts: Record<string, number> = {};
  
  tvShows.forEach(show => {
    const match = show.duration.match(/(\d+)/);
    const seasons = match ? match[1] : 'Unknown';
    
    if (!seasonCounts[seasons]) {
      seasonCounts[seasons] = 0;
    }
    seasonCounts[seasons]++;
  });
  
  return Object.entries(seasonCounts).map(([seasons, count]) => ({
    seasons,
    count
  }));
};

// Get content additions by year
export const getContentAdditionsByYear = () => {
  const additionsByYear: Record<string, number> = {};
  
  disneyData.forEach(item => {
    const match = item.date_added.match(/\d{4}$/);
    if (match) {
      const year = match[0];
      if (!additionsByYear[year]) {
        additionsByYear[year] = 0;
      }
      additionsByYear[year]++;
    }
  });
  
  // Sort by year
  const sortedYears = Object.keys(additionsByYear).sort();
  
  return {
    years: sortedYears,
    counts: sortedYears.map(year => additionsByYear[year])
  };
};

// Get country distribution
export const getCountryDistribution = () => {
  const countryCounts: Record<string, number> = {};
  
  disneyData.forEach(item => {
    const countries = item.country.split(', ');
    countries.forEach(country => {
      if (!countryCounts[country]) {
        countryCounts[country] = 0;
      }
      countryCounts[country]++;
    });
  });
  
  return Object.entries(countryCounts)
    .map(([country, count]) => ({
      country,
      count
    }))
    .sort((a, b) => b.count - a.count);
};

// Get top directors
export const getTopDirectors = (limit: number = 10) => {
  const directorCounts: Record<string, number> = {};
  
  disneyData.forEach(item => {
    if (item.director) {
      const directors = item.director.split(', ');
      directors.forEach(director => {
        if (!directorCounts[director]) {
          directorCounts[director] = 0;
        }
        directorCounts[director]++;
      });
    }
  });
  
  // Sort by count and get top N
  return Object.entries(directorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([director, count]) => ({
      director,
      count
    }));
};

// Get top cast members
export const getTopCastMembers = (limit: number = 10) => {
  const castCounts: Record<string, number> = {};
  
  disneyData.forEach(item => {
    if (item.cast) {
      const castMembers = item.cast.split(', ');
      castMembers.forEach(member => {
        if (!castCounts[member]) {
          castCounts[member] = 0;
        }
        castCounts[member]++;
      });
    }
  });
  
  // Sort by count and get top N
  return Object.entries(castCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([member, count]) => ({
      member,
      count
    }));
};

// Get content by release year and type
export const getContentByYearAndType = () => {
  const yearTypeData: Record<number, { movies: number; tvShows: number }> = {};
  
  disneyData.forEach(item => {
    const year = item.release_year;
    if (!yearTypeData[year]) {
      yearTypeData[year] = { movies: 0, tvShows: 0 };
    }
    
    if (item.type === 'Movie') {
      yearTypeData[year].movies++;
    } else {
      yearTypeData[year].tvShows++;
    }
  });
  
  // Sort by year
  const sortedYears = Object.keys(yearTypeData).map(Number).sort((a, b) => a - b);
  
  return {
    years: sortedYears,
    movies: sortedYears.map(year => yearTypeData[year].movies),
    tvShows: sortedYears.map(year => yearTypeData[year].tvShows)
  };
};