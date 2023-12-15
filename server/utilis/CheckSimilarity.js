
const dummySet = new Set([
    'a','an','the',
    'and', 'also',
    'are','is', 'was','were',
    'them','this',
    'you', 'be', 'which',
    'he','she','it','i', 'we', 'they',
    'from','with',
    'on','to','at','in','of','by','for','out',
    'my','his','its','their',
    'has','have',
    'do' , 'dose', 'but','doing','don’t','dosen’t','any',
    'there','there\'s','about', 'what\'s',
    'becaues', 'as','as a result','since',
    'not','only',
    'if','whereas','whether',
    'can','would', 'could',
    'that','just','using','especially','that\'s','you\'ll','we\'ll',
    'once','very','many','used','both','more','than','well','highly','where','each',
    'when','who','some','such','over','globally',
    'me','us','mine', 'among','told','no','yes','i’m'

]
)
// const checkSimilarity = (text,newText)=>{
//     let set1 = new Set(text.toLowerCase().split(' '))
//     let set2 = new Set(newText.toLowerCase().split(' '))

//     set1 = new Set([...set1].filter(word=>!dummySet.has(word)))
//     set2 = new Set([...set2].filter(word=>!dummySet.has(word)))

//     const intersection = new Set([...set1].filter(x=>set2.has(x)))
//     console.log(set1)
//     console.log(set2)
    
//     console.log(intersection)
//     const union = new Set([...set1, ...set2]);
//     return intersection.size / union.size;
// }

// const article = `The spokesman Matthew Miller was pressed on this again today. He repeated that the department is monitoring and collecting information on the conflict, but has made no legal determination on whether Israel is complying with the laws of war.

// He also stressed that the administration makes clear to Israelis they should be doing more to minimise civilian harm in Gaza, and has seen “progress in a number of areas".

// But there’s growing disquiet among some in congress about Israel’s military conduct. Five Democratic senators wrote to the president last week asking for details about US oversight and accountability measures on arms sales to Israel.

// Biden told a closed-door fundraising event on Tuesday that Israel was starting to lose international support because of its destructive bombing campaign.`

// const newQ = `I’m sorry, I don’t have any information about what’s happening today. However, you can check out the following news websites to stay updated on the latest news:

// CNN World News: Provides international news and videos from Europe, Asia, Africa, the Middle East, and the Americas 1.
// The New York Times: Covers breaking news, photos, and videos from around the United States 2.
// NBC News: Offers top news stories, updates, videos, and photos 3.
// BBC World News: Provides international news, features, and analysis from Africa, the Asia-Pacific, Europe, Latin America, the Middle East, South Asia, and the United States and Canada 4.
// I hope this helps!`

// const before = Date.now()
// console.log(checkSimilarity(article,newQ))



const documentA = `Machine learning (ML) is a type of artificial intelligence (AI) focused on building computer systems that learn from data. The broad range of techniques ML encompasses enables software applications to improve their performance over time.

Machine learning algorithms are trained to find relationships and patterns in data. They use historical data as input to make predictions, classify information, cluster data points, reduce dimensionality and even help generate new content, as demonstrated by new ML-fueled applications such as ChatGPT, Dall-E 2 and GitHub Copilot.

Machine learning is widely applicable across many industries. Recommendation engines, for example, are used by e-commerce, social media and news organizations to suggest content based on a customer's past behavior. Machine learning algorithms and machine vision are a critical component of self-driving cars, helping them navigate the roads safely. In healthcare, machine learning is used to diagnose and suggest treatment plans. Other common ML use cases include fraud detection, spam filtering, malware threat detection, predictive maintenance and business process automation.

While machine learning is a powerful tool for solving problems, improving business operations and automating tasks, it's also a complex and challenging technology, requiring deep expertise and significant resources. Choosing the right algorithm for a task calls for a strong grasp of mathematics and statistics. Training machine learning algorithms often involves large amounts of good quality data to produce accurate results. The results themselves can be difficult to understand -- particularly the outcomes produced by complex algorithms, such as the deep learning neural networks patterned after the human brain. And ML models can be costly to run and tune.

Still, most organizations either directly or indirectly through ML-infused products are embracing machine learning. According to the "2023 AI and Machine Learning Research Report" from Rackspace Technology, 72% of companies surveyed said that AI and machine learning are part of their IT and business strategies, and 69% described AI/ML as the most important technology. Companies that have adopted it reported using it to improve existing processes (67%), predict business performance and industry trends (60%) and reduce risk (53%).

TechTarget's guide to machine learning is a primer on this important field of computer science, further explaining what machine learning is, how to do it and how it is applied in business. You'll find information on the various types of machine learning algorithms, the challenges and best practices associated with developing and deploying ML models, and what the future holds for machine learning. Throughout the guide, there are hyperlinks to related articles that cover the topics in greater depth.`;
const documentB = `Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.

IBM has a rich history with machine learning. One of its own, Arthur Samuel, is credited for coining the term, “machine learning” with his research (link resides outside ibm.com) around the game of checkers. Robert Nealey, the self-proclaimed checkers master, played the game on an IBM 7094 computer in 1962, and he lost to the computer. Compared to what can be done today, this feat seems trivial, but it’s considered a major milestone in the field of artificial intelligence.

Over the last couple of decades, the technological advances in storage and processing power have enabled some innovative products based on machine learning, such as Netflix’s recommendation engine and self-driving cars.

Machine learning is an important component of the growing field of data science. Through the use of statistical methods, algorithms are trained to make classifications or predictions, and to uncover key insights in data mining projects. These insights subsequently drive decision making within applications and businesses, ideally impacting key growth metrics. As big data continues to expand and grow, the market demand for data scientists will increase. They will be required to help identify the most relevant business questions and the data to answer them.

Machine learning algorithms are typically created using frameworks that accelerate solution development, such as TensorFlow and PyTorch.`;

// Function to tokenize text into individual words (terms)
const syn = {
    'section':'branch',
    'divison':'branch',
    'type' : 'branch',
    'concentrate':'focus',
    'focused':'focus',
    'that' : 'which',
    'simulate':'imitate', 
    'mimc' : 'imitate',
    'extensive' : 'rich',
    'evolove':'imporve',
    'better' : 'improve',
    'prettify' : 'improve',
    'improving':'improve',
    'advances':'improve',
    'created':'make',
    'create' : 'make',
    'solutions':'answer',
    'solution':'answer',
    'answers':'answer',
    'understand' : 'learn',
    'comprehend':'learn',
    'accelerate':'fast',
    'speed':'fast',
    'hurry':'fast',
    'challenges':'challenge',
    'techniques':'way',
    'technique':'way',
    'manner':'way',
    'employ':'use',
    'utilize':'use',
    'hire':'use',
    'regarding':'related'

}
let sen1 = 'is a section of which concentrate'
function tokenize(text) {
    text =text.toLowerCase().split(/[^a-z_]+/).filter(Boolean);
    text = text.filter(token=>!dummySet.has(token))
    text=text.map(token=> syn[token] ? syn[token] : token)
    return text
}

function calculateIDF(term, documents) {
    const documentsContainingTerm = documents.filter(document => tokenize(document).includes(term));
    const inverseDocumentFrequency = Math.log(documents.length / documentsContainingTerm.length + 1);
    return inverseDocumentFrequency;
}

function calculateTF(term, document) {
    const terms = tokenize(document);
    const termCount = terms.filter(t => t === term).length;
    const termFrequency = termCount / terms.length;
    return termFrequency;
}

function calculateTFIDF(document, documents) {
    const terms = tokenize(document);
    const tfidf = {};
    terms.forEach(term => {
      const tf = calculateTF(term, document);
      const idf = calculateIDF(term, documents);
      tfidf[term] = tf * idf;
    });
    return tfidf;
  }

const documents = [documentA, documentB];
const tfidfA = calculateTFIDF(documentA, documents);
const tfidfB = calculateTFIDF(documentB, documents);
// Function to compute cosine similarity between two TF-IDF vectors
function cosineSimilarity(vectorA, vectorB) {
    const dotProduct = Object.keys(vectorA).reduce((acc, term) => {
      return acc + (vectorA[term] * vectorB[term] || 0);
    }, 0);
  
    const magA = Math.sqrt(Object.values(vectorA).reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(Object.values(vectorB).reduce((acc, val) => acc + val * val, 0));
  
    if (magA === 0 || magB === 0) {
      return 0; // To handle division by zero error
    }
  
    return ((dotProduct / (magA * magB)) * 100);
  }

const similarity = cosineSimilarity(tfidfA, tfidfB);

console.log(similarity)
