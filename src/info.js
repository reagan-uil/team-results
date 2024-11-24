var event = [
  ["AC", "Accounting"],
  ["CL", "Calculator"],
  ["CO", "Computer Applications"],
  ["CS", "Computer Science"],
  ["CP", "Copy Editing"],
  ["CE", "Current Events"],
  ["FW", "Feature Writing"],
  ["GM", "Mathematics"],
  ["LC", "Literary Crit"],
  ["NS", "Number Sense"],
  ["PO", "Poetry Interpretation"],
  ["PR", "Prose Interpretation"],
  ["SC", "Science"],
  ["SS", "Social Studies"],
  ["SP", "Spelling"]
];

var tres = [
  ["2023 AC", "1st Team Districts | 2nd Team Regionals"],
  ["2023 CL", ""],
  ["2023 CS", "1st Team Districts | 5th Team Regionals"],
  ["2023 CE", "2nd Team Districts"],
  ["2023 LC", "1st Team Districts | 2nd Team Regionals"],
  ["2023 GM", "1st Team Districts"],
  ["2023 SC", "1st Team Districts | 2nd Team Regionals"],
  ["2023 SS", "5th Team Districts"],
  ["2023 SP", "4th Team Districts"],
  ["2024 CL", "2nd Team Districts"],
  ["2024 CS", "1st Team Districts | 7th Team Regionals"],
  ["2024 CE", "2nd Team Districts | 3rd Team Regionals"],
  ["2024 GM", "2nd Team Districts"],
  ["2024 LC", "2nd Team Districts"],
  ["2024 NS", "1st Team Districts | 6th Team Regionals"],
  ["2024 SC", "1st Team Districts | 2nd Team Regionals"],
  ["2024 SS", "2nd Team Districts"],
  ["2024 SP", "1st Team Districts | 7th Team Regionals"]
]

var res = [
  ["2023 AC", "Joseph Rivera: 1st Districts, 2nd Regionals, 15th State | Aracely Reid: 2nd Districts, 5th Regionals | Ethan Doyle: 3rd Districts, 10th Regionals"],
  ["2023 CL", "Nathan Sujatno: 1st Districts, 12th Regionals | Sarthak Dayal: 4th Districts"],
  ["2023 CO", "Joseph Rivera: 1st Districts, 7th Regionals | Katrina Rendon: 2nd Districts, 2nd Regionals, 11th State | Jorge Arnaiz Briseno: 3rd Districts, 12th Regionals"],
  ["2023 CS", "Pohan Ai: 1st Districts, 18th Regionals | Sarthak Dayal: 3rd Districts, 12th Regionals | Lester Heredia Gopar: 6th Districts, 16th Regionals | Yavuz Inan: 9th Districts, 17th Regionals"],
  ["2023 CP", "Shanthi Kapoor: 4th Districts"],
  ["2023 CE", "Hudson Locke: 4th Districts | Charles Wentworth: 5th Districts | Annabelle Baehr: 15th Districts | Aden Ramirez: 21st Districts"],
  ["2023 FW", "Contessa Turner: 1st Districts"],
  ["2023 LC", "Esha Manandhar: 1st Districts, 6th Regionals | Ngan Le: 3rd Districts, 32nd Regionals | Ryan Whalen: 4th Districts, 30th Regionals | Kathy Le: 5th Districts | Rohit Panekkat: 4th Regionals"],
  ["2023 GM", "Sarthak Dayal: 2nd Districts, 6th Regionals | Lester Heredia Gopar: 4th Districts, 10th Regionals | Kathy Le: 6th Districts | Jack Guarnery: 8th Districts"],
  ["2023 PO", "Katie Eanes: 1st Districts, 4th Regionals"],
  ["2023 PR", "Cassidy Reynolds: 1st Districts | Mia Annillo: 4th Districts"],
  ["2023 SC", "Cindy Li: 1st Districts, 1st Biology Districts, 1st Chemistry Districts, 3rd Physics Districts, 9th Regionals, 1st Biology Regionals, 17th State, 3rd Biology State | Sarthak Dayal: 2nd Districts, 3rd Biology Districts, 1st Chemistry Districts, 1st Physics Districts, 2nd Biology Regionals, 2nd Physics Regionals, 18th State | Lester Heredia Gopar: 4th Districts, 1st Chemistry Districts, 4th Regionals, 3rd Chemistry Regionals, 5th Physics Regionals | Dan Samuel: 14th Districts | Sidhartha Kakumanu: 6th Regionals, 4th Biology Regionals"],
  ["2023 SS", "Charles Wentworth: 9th Districts | Connor Cody: 16th Districts | Aden Ramirez: 17th Districts | Emilio Dwarica: 19th Districts"],
  ["2023 SP", "Nicole Keller: 4th Districts | Esshal Maknotiya: 12th Districts | Mia Gutirrez: 19th Districts"],
  ["2024 CL", "William Liu: 3rd Districts, 25th Regionals | Johnson Wei: 5th Districts | Suho Park: 14th Districts | Mohit Singh: 18th Districts"],
  ["2024 CS", "Pohan Ai: 1st Districts, 28th Regionals | William Liu: 4th Districts, 17th Regionals | Yavuz Inan: 5th Districts, 33rd Regionals | Jack Mitchell: 10th Districts, 38th Regionals"],
  ["2024 CE", "Hudson Locke: 3rd Districts, 10th Regionals | Charles Wentworth: 6th Districts, 29th Regionals | Cody Cox: 7th Districts, 8th Regionals | Montserrat Arreola: 13th Districts, 22nd Regionals"],
  ["2024 GM", "William Liu: 3rd Districts, 13th Regionals | Johnson Wei: 4th Districts | Yavuz Inan: 9th Districts | Aarnav Shah: 11th Districts"],
  ["2024 LC", "Ariana Hernandez: 2nd Districts, 23rd Regionals | Percy Beckman: 5th Districts | Robert Rios: 7th Districts"],
  ["2024 NS", "William Liu: 2nd Districts, 18th Regionals | Johnson Wei: 3rd Districts, 22nd Regionals | Aarnav Shah: 8th Districts, 34th Regionals | Levi Doles: 10th Districts"],
  ["2024 PO", "Jasmine Wintemute: 2nd Districts | Mia Annillo: 3rd Districts | Kyra Yiannos: 6th Districts"],
  ["2024 PR", "Mary Kimbrough: 1st Districts | Mariana Galindo: 6th Districts"],
  ["2024 SC", "Cindy Li: 1st Districts, 1st Bio Districts, 1st Chem Districts, 1st Phys Districts, 3rd Regionals, 2nd Biology Regionals, 5th Chemistry Regionals, 1st Biology State, 24th State | Yavuz Inan: 4th Districts, 3rd Physics Districts, 32nd Regionals | Alexis Tao: 4th Chemistry Districts, 11th Districts, 18th Regionals | Dhruvi Desai: 17th Districts | Julia Kazunas: 20th Regionals"],
  ["2024 SS", "Manuel Mora: 2nd Districts, 17th Regionals | Katherine Green: 6th Districts | Roan Roux: 7th Districts"],
  ["2024 SP", "Paige Opaska: 1st Districts, 11th Regionals | Mariana Montemayor: 7th Districts, 21st Regionals | Nicole Keller: 10th Districts, 28th Regionals | Esshal Maknotiya: 16th Districts, 34th Regionals "],
]