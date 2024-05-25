import { Document, Page, Text,Image, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import logo from '../../assets/logo.png'



// Create Document Component
const QuestionsPDF = ({questions}) =>{
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#fff',
          padding:10
        },
        section: {
          margin: 10,
          padding: 10,
        },
        question:{
            margin:10,
        },
        question_content:{
          backgroundColor:'#f0f0f0',
          borderRadius:10,
          padding:5
        },
        image:{
          width:'20%',
          position:'absolute',
          top:'20px',
          right:'20px'
        },
        image_wrapper:{
            position:'relative',
            height:'100px'
        },
        question_title:{
            marginLeft:10,
            fontSize:16
        },
        answer : {
            borderRadius:10,
            width : '80%',
            marginLeft: 'auto'

        },
        p:{
            color:'#0C2C43',
            fontWeight: 500,
            fontSize: 20,
            padding: 5,
        }
      });
    return  (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <View style={styles.image_wrapper}>
            <Image style={styles.image} src={logo} />
        </View>
        {questions.map((question,key)=>
        <>
            <View style={styles.question}>
                <Text style={styles.question_title}>Asked by {question.q_username}</Text>
                <View style = {styles.question_content} key={key}>
                    <Text style={styles.p}>{question.question}</Text>
                </View>
            </View>
            {/* this is the answer */}
            {question.answers.map((answer)=>{
                if (answer.answer)
                    return  (
                        <View style={styles.answer}>
                            <Text style={styles.question_title}>Answered by {answer.ans_username}</Text>
                            <View style = {styles.question_content} key={key}>
                                <Text style={styles.p}>{answer.answer}</Text>
                            </View>
                        </View>
                    )
            }
               
            )}

        </>
        )}
      </View>
      
    </Page>
  </Document>
)};


export default QuestionsPDF