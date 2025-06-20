import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const languages = [
	{ code: 'en-IN', label: 'English' },
	{ code: 'hi-IN', label: 'Hindi' },
	{ code: 'te-IN', label: 'Telugu' },
	{ code: 'ta-IN', label: 'Tamil' },
	{ code: 'mr-IN', label: 'Marathi' },
	// Add more as needed
];

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
	const [language, setLanguage] = useState('en-IN');
	const recognitionRef = useRef<any>(null);

	// Initialize Speech Recognition
	useEffect(() => {
		// @ts-ignore
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (SpeechRecognition) {
			recognitionRef.current = new SpeechRecognition();
			recognitionRef.current.lang = language;
			recognitionRef.current.interimResults = false;
			recognitionRef.current.onresult = async (event: any) => {
				const transcript = event.results[0][0].transcript;
				setMessages((prev) => [...prev, { text: transcript, sender: 'user' }]);
				setIsListening(false);
				const botReply = await getBotResponse(transcript);
				setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
				setTimeout(() => speak(botReply), 200);
			};
			recognitionRef.current.onend = () => setIsListening(false);
		}
	}, [language]);

	// Speak out bot reply
	const speak = (text: string) => {
		if ('speechSynthesis' in window) {
			const utterance = new window.SpeechSynthesisUtterance(text);
			utterance.lang = language;

			// Try to select a matching voice for the language
			const voices = window.speechSynthesis.getVoices();
			const match = voices.find((v) => v.lang === language);
			if (match) utterance.voice = match;

			// Cancel any ongoing speech before speaking new text
			window.speechSynthesis.cancel();
			window.speechSynthesis.speak(utterance);
		}
	};

	// Ensure voices are loaded before first speak
	if ('speechSynthesis' in window) {
		window.speechSynthesis.onvoiceschanged = () => {};
	}

	// Dummy AI response (replace with your backend/AI API)
	const getBotResponse = async (input: string): Promise<string> => {
		const question = input.toLowerCase();

		const responses: Record<string, Record<string, string>> = {
			'monsoon crops': {
				'en-IN': 'In monsoon, crops like rice, maize, and soybean are commonly grown.',
				'hi-IN': 'मानसून के मौसम में धान, मक्का, सोयाबीन जैसी फसलें उगाई जाती हैं।',
				'te-IN': 'మాన్సూన్ కాలంలో వరి, మక్కజొన్న, సోయాబీన్ పంటలు సాగు చేయవచ్చు.',
				'ta-IN': 'மழைக்காலத்தில் அரிசி, மக்காச்சோளம் மற்றும் சோயா போன்ற பயிர்கள் வளர்க்கப்படுகின்றன.',
				'mr-IN': 'मान्सूनमध्ये भात, मका आणि सोयाबीन यासारखी पिके घेतली जातात.'
			},
			'summer crops': {
				'en-IN': 'Summer crops include maize, millets, and pulses. Ensure good irrigation.',
				'hi-IN': 'गर्मी में मक्का, बाजरा और दालें उगाई जाती हैं। सिंचाई का ध्यान रखें।',
				'te-IN': 'గ్రీష్మకాలంలో మక్కజొన్న, బాజ్రా మరియు పప్పుదినుసులు సాగు చేయబడతాయి.',
				'ta-IN': 'வெயில் பருவத்தில் மக்காச்சோளம், கம்பு மற்றும் பருப்பு பயிர்கள் வளர்க்கப்படுகின்றன.',
				'mr-IN': 'उन्हाळ्यात मका, ज्वारी आणि डाळीची पिके घेतली जातात.'
			},
			'winter crops': {
				'en-IN': 'Winter (Rabi) crops include wheat, barley, mustard, and peas.',
				'hi-IN': 'सर्दियों में गेहूं, जौ, सरसों और मटर जैसी रबी फसलें बोई जाती हैं।',
				'te-IN': 'చలికాలంలో గోధుమ, బార్లీ, ఆవాలు మరియు బటానీ పంటలు సాగు చేస్తారు.',
				'ta-IN': 'குளிர்காலத்தில் கோதுமை, பர்லி, கடுகு மற்றும் பட்டாணி போன்ற பயிர்கள் வளர்க்கப்படுகின்றன.',
				'mr-IN': 'हिवाळ्यात गहू, बार्ली, मोहरी आणि वाटाणा पिके घेतली जातात.'
			},
			'best fertilizer': {
				'en-IN': 'Use NPK fertilizer based on soil test. Organic compost is also good.',
				'hi-IN': 'मिट्टी की जांच के आधार पर एनपीके उर्वरक का प्रयोग करें। जैविक खाद भी लाभकारी है।',
				'te-IN': 'మట్టిలో పోషకాలు తెలుసుకొని NPK ఎరువులు వాడండి. జీవ ఎరువులు కూడా మంచివి.',
				'ta-IN': 'மண்ணின் நிலையைப் பார்த்து NPK உரங்களைப் பயன்படுத்தவும். இயற்கை堆肥வும் நல்லது.',
				'mr-IN': 'माती तपासून NPK खत वापरा. सेंद्रिय खतसुद्धा उपयुक्त आहे.'
			},
			'organic farming': {
				'en-IN': 'Organic farming avoids chemicals, using compost and natural pest control.',
				'hi-IN': 'जैविक खेती में रासायनिक खाद और कीटनाशकों से बचा जाता है, और कंपोस्ट व प्राकृतिक तरीकों से खेती होती है।',
				'te-IN': 'ఆర్గానిక్ వ్యవసాయం అంటే రసాయనాలను వాడకుండా జీవ ఎరువులు, సహజ నివారణలు వాడడం.',
				'ta-IN': 'இயற்கை விவசாயம் என்பது ரசாயனங்களை தவிர்த்து இயற்கை உரங்கள் மற்றும் பாதுகாப்புகளை பயன்படுத்துவது.',
				'mr-IN': 'सेंद्रिय शेती म्हणजे रसायनांपासून मुक्त, सेंद्रिय खत आणि नैसर्गिक कीडनियंत्रण वापरणे.'
			},
			'pesticide use': {
				'en-IN': 'Use neem oil or bio-pesticides. Consult experts for chemical alternatives.',
				'hi-IN': 'नीम का तेल या जैविक कीटनाशक का प्रयोग करें। रासायनिक विकल्प के लिए विशेषज्ञ की सलाह लें।',
				'te-IN': 'వేప నూనె లేదా బయోపెస్టిసైడ్లు వాడండి. అవసరమైతే నిపుణుల సలహా తీసుకోండి.',
				'ta-IN': 'வேப்பெண்ணெய் அல்லது உயிரி பூச்சிக்கொல்லிகளை பயன்படுத்தவும். தேவையெனில் நிபுணர்களிடம் ஆலோசனை பெறவும்.',
				'mr-IN': 'नीम तेल किंवा जैविक कीटकनाशक वापरा. रासायनिक पर्यायासाठी तज्ज्ञ सल्ला घ्या.'
			},
			'soil testing': {
				'en-IN': 'Soil testing helps determine nutrient levels for better crop planning.',
				'hi-IN': 'मिट्टी की जांच से पोषक तत्वों का स्तर पता चलता है जिससे फसल योजना बेहतर बनती है।',
				'te-IN': 'మట్టి పరీక్షతో పోషకాల స్థాయిలు తెలుసుకోగలుగుతారు, ఇది పంటల నిర్వహణకు ఉపయోగపడుతుంది.',
				'ta-IN': 'மண்ணின் சோதனை மூலம் அதில் உள்ள ஊட்டச்சத்துக்களின் அளவை அறிந்து பயிர்ச்செய்கையில் உதவுகிறது.',
				'mr-IN': 'माती चाचणीमुळे पोषणतत्त्वांची माहिती मिळते आणि फसल नियोजन सुधारते.'
			},
			'irrigation methods': {
				'en-IN': 'Drip and sprinkler irrigation save water and improve yield.',
				'hi-IN': 'ड्रिप और स्प्रिंकलर सिंचाई पानी बचाते हैं और उपज बढ़ाते हैं।',
				'te-IN': 'డ్రిప్ మరియు స్ప్రింక్లర్ విధానాలు నీటిని ఆదా చేస్తాయి మరియు దిగుబడి పెంచుతాయి.',
				'ta-IN': 'டிரிப் மற்றும் ஸ்பிரிங்கிளர் நீர்ப்பாசனம் நீரைச் சேமித்து விளைச்சலை அதிகரிக்கின்றன.',
				'mr-IN': 'ड्रीप व स्प्रिंकलर सिंचनाने पाणी वाचते आणि उत्पादन वाढते.'
			},
			'crop rotation': {
				'en-IN': 'Crop rotation improves soil and reduces pests. Rotate legumes and grains.',
				'hi-IN': 'फसल चक्र मिट्टी को बेहतर बनाता है और कीटों को कम करता है। दलहनों और अनाज को बदल-बदल कर बोएं।',
				'te-IN': 'పంటల మార్పిడి మట్టిని మెరుగుపరిచి, తెగుళ్ల ప్రభావాన్ని తగ్గిస్తుంది.',
				'ta-IN': 'பயிர் மாற்றம் மண்ணின் தரத்தை மேம்படுத்தி, பூச்சிகளை குறைக்க உதவுகிறது.',
				'mr-IN': 'पिकांची फेरफार जमिनीची गुणवत्ता सुधारते आणि कीड कमी करते.'
			},
			'natural pest control': {
				'en-IN': 'Use neem oil, traps, and natural predators for safe pest control.',
				'hi-IN': 'नीम का तेल, ट्रैप और प्राकृतिक कीट भक्षकों का प्रयोग करें।',
				'te-IN': 'వేప నూనె, ట్రాప్స్ మరియు సహజ శత్రువులను వాడండి.',
				'ta-IN': 'வேப்பெண்ணெய், கண்ணிகள் மற்றும் இயற்கை எதிரிகளைக் கொண்டு பூச்சிகளை கட்டுப்படுத்தலாம்.',
				'mr-IN': 'नीम तेल, सापळे व नैसर्गिक शत्रूंचा वापर करावा.'
			},
			'telangana crops': {
				'en-IN': 'Major crops in Telangana are rice, cotton, maize, and red gram.',
				'hi-IN': 'तेलंगाना में मुख्य फसलें हैं - धान, कपास, मक्का और अरहर।',
				'te-IN': 'తెలంగాణలో ముఖ్యమైన పంటలు వరి, పత్తి, మక్కజొన్న మరియు కందులు.',
				'ta-IN': 'தெலுங்கானாவில் முக்கியமான பயிர்கள் அரிசி, பருத்தி, மக்காச்சோளம் மற்றும் தொட்டைக்கடலை.',
				'mr-IN': 'तेलंगणामध्ये भात, कापूस, मका व तूर ही प्रमुख पिके आहेत.'
			},
			'black soil crops': {
				'en-IN': 'Black soil is ideal for cotton, soybean, and sorghum.',
				'hi-IN': 'काली मिट्टी कपास, सोयाबीन और ज्वार के लिए उपयुक्त है।',
				'te-IN': 'నల్ల మట్టి పత్తి, సోయాబీన్, జొన్నలకు అనుకూలంగా ఉంటుంది.',
				'ta-IN': 'கருப்பு மண் பருத்தி, சோயா மற்றும் சோளம் போன்ற பயிர்களுக்கு ஏற்றது.',
				'mr-IN': 'काळी माती कापूस, सोयाबीन आणि ज्वारीसाठी योग्य आहे.'
			},
			'compost preparation': {
				'en-IN': 'Use kitchen waste, dry leaves, and cow dung to prepare compost.',
				'hi-IN': 'किचन वेस्ट, सूखी पत्तियां और गोबर से कंपोस्ट तैयार करें।',
				'te-IN': 'వంటింటి మాలినాలు, ఎండిన ఆకులు, ఎద్దుల పొదిని వాడి కంపోస్ట్ తయారు చేయండి.',
				'ta-IN': 'அடுப்பும்ஒரங்குப்பழங்கள், உலர்ந்த இலைகள் மற்றும் மாட்டுப்பழிவைப் பயன்படுத்தி எளிய堆肥 தயாரிக்கலாம்.',
				'mr-IN': 'स्वयंपाकघरातील कचरा, सुकलेली पाने आणि शेणखत वापरून कंपोस्ट तयार करा.'
			},
			'tomato fertilizer': {
				'en-IN': 'Use nitrogen early and potassium during flowering for tomatoes.',
				'hi-IN': 'टमाटर में शुरुआत में नाइट्रोजन और फल बनने पर पोटेशियम का प्रयोग करें।',
				'te-IN': 'టమోటా ప్రారంభంలో నైట్రోజన్, పుష్పించేటప్పుడు పొటాషియం ఇవ్వాలి.',
				'ta-IN': 'தக்காளிக்காக ஆரம்பத்தில் நைட்ரஜன் மற்றும் மலர்ச்சிக்குப்பின் பொட்டாசியம் தேவை.',
				'mr-IN': 'टोमॅटोसाठी सुरुवातीला नायट्रोजन आणि फुलांनंतर पोटॅशियम द्या.'
			},
			'weed control': {
				'en-IN': 'Weeds can be controlled with mulching, hand weeding, or herbicides.',
				'hi-IN': 'घास-पात को मल्चिंग, हाथ से निकालना या खरपतवारनाशी से नियंत्रित किया जा सकता है।',
				'te-IN': 'గడ్డి పెరగకుండా మల్చింగ్, చేతితో తీయడం లేదా హెర్బిసైడ్లు వాడాలి.',
				'ta-IN': 'புல்லிகளை கட்டுப்படுத்த மัล்ச்சிங், கையால் நீக்கம் அல்லது பூச்சிக்கொல்லிகள் பயன்படுத்தலாம்.',
				'mr-IN': 'गवत नियंत्रणासाठी मल्चिंग, हाताने काढणे किंवा रसायन वापरले जाते.'
			},
       // Telugu keys
  'మాన్సూన్ పంటలు': {
    'en-IN': 'In monsoon, crops like rice, maize, and soybean are commonly grown.',
    'hi-IN': 'मानसून के मौसम में धान, मक्का, सोयाबीन जैसी फसलें उगाई जाती हैं।',
    'te-IN': 'మాన్సూన్ కాలంలో వరి, మక్కజొన్న, సోయాబీన్ పంటలు సాగు చేయవచ్చు.',
    'ta-IN': 'மழைக்காலத்தில் அரிசி, மக்காச்சோளம் மற்றும் சோயா போன்ற பயிர்கள் வளர்க்கப்படுகின்றன.',
    'mr-IN': 'मान्सूनमध्ये भात, मका आणि सोयाबీన यासारखी पिके घेतली जातात.'
  },
  'గ్రీష్మకాల పంటలు': {
    'en-IN': 'Summer crops include maize, millets, and pulses. Ensure good irrigation.',
    'hi-IN': 'गर्मी में मक्का, बाजरा और दालें उगाई जाती हैं। सिंचाई का ध्यान रखें।',
    'te-IN': 'గ్రీష్మకాలంలో మక్కజొన్న, బాజ్రా మరియు పప్పుదినుసులు సాగు చేయబడతాయి.',
    'ta-IN': 'வெயில் பருவத்தில் மக்காச்சோளம், கம்பு மற்றும் பருப்பு பயிர்கள் வளர்க்கப்படுகின்றன.',
    'mr-IN': 'उन्हाळ्यात मका, ज्वारी आणि डाळीची पिके घेतली जातात.'
  },
  'చలికాల పంటలు': {
    'en-IN': 'Winter (Rabi) crops include wheat, barley, mustard, and peas.',
    'hi-IN': 'सर्दियों में गेहूं, जौ, सरसों और मटर जैसी रबी फसलें बोई जाती हैं।',
    'te-IN': 'చలికాలంలో గోధుమ, బార్లీ, ఆవాలు మరియు బటానీ పంటలు సాగు చేస్తారు.',
    'ta-IN': 'குளிர்காலத்தில் கோதுமை, பர்லி, கடுகு மற்றும் பட்டாணி போன்ற பயிர்கள் வளர்க்கப்படுகின்றன.',
    'mr-IN': 'हिवाळ्यात गहू, बार्ली, मोहरी आणि वाटाणा पिके घेतली जातात.'
  },
  'ఉత్తమ ఎరువు': {
    'en-IN': 'Use NPK fertilizer based on soil test. Organic compost is also good.',
    'hi-IN': 'मिट्टी की जांच के आधार पर एनपीके उर्वरक का प्रयोग करें। जैविक खाद भी लाभकारी है।',
    'te-IN': 'మట్టిలో పోషకాలు తెలుసుకొని NPK ఎరువులు వాడండి. జీవ ఎరువులు కూడా మంచివి.',
    'ta-IN': 'மண்ணின் நிலையைப் பார்த்து NPK உரங்களைப் பயன்படுத்தவும். இயற்கை堆肥வும் நல்லது.',
    'mr-IN': 'माती तपासून NPK खत वापरा. सेंद्रिय खतसुद्धा उपयुक्त आहे.'
  },
  'సేంద్రీయ వ్యవసాయం': {
    'en-IN': 'Organic farming avoids chemicals, using compost and natural pest control.',
    'hi-IN': 'जैविक खेती में रासायनिक खाद और कीटनाशकों से बचा जाता है, और कंपोस्ट व प्राकृतिक तरीकों से खेती होती है।',
    'te-IN': 'ఆర్గానిక్ వ్యవసాయం అంటే రసాయనాలను వాడకుండా జీవ ఎరువులు, సహజ నివారణలు వాడడం.',
    'ta-IN': 'இயற்கை விவசாயம் என்பது ரசாயனங்களை தவிர்த்து இயற்கை உரங்கள் மற்றும் பாதுகாப்புகளை பயன்படுத்துவது.',
    'mr-IN': 'सेंद्रिय शेती म्हणजे रसायनांपासून मुक्त, सेंद्रिय खत आणि नैसर्गिक कीडनियंत्रण वापरणे.'
  },
  'పురుగు మందుల వాడకం': {
    'en-IN': 'Use neem oil or bio-pesticides. Consult experts for chemical alternatives.',
    'hi-IN': 'नीम का तेल या जैविक कीटनाशक का प्रयोग करें। रासायनिक विकल्प के लिए विशेषज्ञ की सलाह लें।',
    'te-IN': 'వేప నూనె లేదా బయోపెస్టిసైడ్లు వాడండి. అవసరమైతే నిపుణుల సలహా తీసుకోండి.',
    'ta-IN': 'வேப்பெண்ணெய் அல்லது உயிரி பூச்சிக்கொல்லிகளை பயன்படுத்தவும். தேவையெனில் நிபுணர்களிடம் ஆலோசனை பெறவும்.',
    'mr-IN': 'नीम तेल किंवा जैविक कीटकनाशक वापरा. रासायनिक पर्यायासाठी तज्ज्ञ सल्ला घ्या.'
  },
  'మట్టి పరీక్ష': {
    'en-IN': 'Soil testing helps determine nutrient levels for better crop planning.',
    'hi-IN': 'मिट्टी की जांच से पोषक तत्वों का स्तर पता चलता है जिससे फसल योजना बेहतर बनती है।',
    'te-IN': 'మట్టి పరీక్షతో పోషకాల స్థాయిలు తెలుసుకోగలుగుతారు, ఇది పంటల నిర్వహణకు ఉపయోగపడుతుంది.',
    'ta-IN': 'மண்ணின் சோதனை மூலம் அதில் உள்ள ஊட்டச்சத்துக்களின் அளவை அறிந்து பயிர்ச்செய்கையில் உதவுகிறது.',
    'mr-IN': 'माती चाचणीमुळे पोषणतत्त्वांची माहिती मिळते आणि फसल नियोजन सुधारते.'
  },
  'పారిశ్రామిక పద్ధతులు': {
    'en-IN': 'Drip and sprinkler irrigation save water and improve yield.',
    'hi-IN': 'ड्रिप और स्प्रिंकलर सिंचाई पानी बचाते हैं और उपज बढ़ाते हैं।',
    'te-IN': 'డ్రిప్ మరియు స్ప్రింక్లర్ విధానాలు నీటిని ఆదా చేస్తాయి మరియు దిగుబడి పెంచుతాయి.',
    'ta-IN': 'டிரிப் மற்றும் ஸ்பிரிங்கிளர் நீர்ப்பாசனம் நீரைச் சேமித்து விளைச்சலை அதிகரிக்கின்றன.',
    'mr-IN': 'ड्रीप व स्प्रिंकलर सिंचनाने पाणी वाचते आणि उत्पादन वाढते.'
  },
  'పంటల మార్పిడి': {
    'en-IN': 'Crop rotation improves soil and reduces pests. Rotate legumes and grains.',
    'hi-IN': 'फसल चक्र मिट्टी को बेहतर बनाता है और कीटों को कम करता है। दलहनों और अनाज को बदल-बदल कर बोएं।',
    'te-IN': 'పంటల మార్పిడి మట్టిని మెరుగుపరిచి, తెగుళ్ల ప్రభావాన్ని తగ్గిస్తుంది.',
    'ta-IN': 'பயிர் மாற்றம் மண்ணின் தரத்தை மேம்படுத்தி, பூச்சிகளை குறைக்க உதவுகிறது.',
    'mr-IN': 'पिकांची फेरफार जमिनीची गुणवत्ता सुधारते आणि कीड कमी करते.'
  },
  'సహజ పురుగు నియంత్రణ': {
    'en-IN': 'Use neem oil, traps, and natural predators for safe pest control.',
    'hi-IN': 'नीम का तेल, ट्रैप और प्राकृतिक कीट भक्षकों का प्रयोग करें।',
    'te-IN': 'వేప నూనె, ట్రాప్స్ మరియు సహజ శత్రువులను వాడండి.',
    'ta-IN': 'வேப்பெண்ணெய், கண்ணிகள் மற்றும் இயற்கை எதிரிகளைக் கொண்டு பூச்சிகளை கட்டுப்படுத்தலாம்.',
    'mr-IN': 'नीम तेल, सापळे व नैसर्गिक शत्रूंचा वापर करावा.'
  },
  'తెలంగాణ పంటలు': {
    'en-IN': 'Major crops in Telangana are rice, cotton, maize, and red gram.',
    'hi-IN': 'तेलंगाना में मुख्य फसलें हैं - धान, कपास, मक्का और अरहर।',
    'te-IN': 'తెలంగాణలో ముఖ్యమైన పంటలు వరి, పత్తి, మక్కజొన్న మరియు కందులు.',
    'ta-IN': 'தெலுங்கானாவில் முக்கியமான பயிர்கள் அரிசி, பருத்தி, மக்காச்சோளம் மற்றும் தொட்டைக்கடலை.',
    'mr-IN': 'तेलंगणामध्ये भात, कापूस, मका व तूर ही प्रमुख पिके आहेत.'
  },
  'నల్ల మట్టి పంటలు': {
    'en-IN': 'Black soil is ideal for cotton, soybean, and sorghum.',
    'hi-IN': 'काली मिट्टी कपास, सोयाबीन और ज्वार के लिए उपयुक्त है।',
    'te-IN': 'నల్ల మట్టి పత్తి, సోయాబీన్, జొన్నలకు అనుకూలంగా ఉంటుంది.',
    'ta-IN': 'கருப்பு மண் பருத்தி, சோயா மற்றும் சோளம் போன்ற பயிர்களுக்கு ஏற்றது.',
    'mr-IN': 'काळी माती कापूस, सोयाबीन आणि ज्वारीसाठी योग्य आहे.'
  },
  'కంపోస్ట్ తయారీ': {
    'en-IN': 'Use kitchen waste, dry leaves, and cow dung to prepare compost.',
    'hi-IN': 'किचन वेस्ट, सूखी पत्तियां और गोबर से कंपोस्ट तैयार करें।',
    'te-IN': 'వంటింటి మాలినాలు, ఎండిన ఆకులు, ఎద్దుల పొదిని వాడి కంపోస్ట్ తయారు చేయండి.',
    'ta-IN': 'அடுப்பும்ஒரங்குப்பழங்கள், உலர்ந்த இலைகள் மற்றும் மாட்டுப்பழிவைப் பயன்படுத்தி எளிய堆肥 தயாரிக்கலாம்.',
    'mr-IN': 'स्वयंपाकघरातील कचरा, सुकलेली पाने आणि शेणखत वापरून कंपोस्ट तयार करा.'
  },
  'టమోటా ఎరువు': {
    'en-IN': 'Use nitrogen early and potassium during flowering for tomatoes.',
    'hi-IN': 'टमाटर में शुरुआत में नाइट्रोजन और फल बनने पर पोटेशियम का प्रयोग करें।',
    'te-IN': 'టమోటా ప్రారంభంలో నైట్రోజన్, పుష్పించేటప్పుడు పొటాషియం ఇవ్వాలి.',
    'ta-IN': 'தக்காளிக்காக ஆரம்பத்தில் நைட்ரஜன் மற்றும் மலர்ச்சிக்குப்பின் பொட்டாசியம் தேவை.',
    'mr-IN': 'टोमॅटोसाठी सुरुवातीला नायट్రोजन आणि फुलांनंतर पोटॅशియం द्या.'
  },
  'కలుపు నియంత్రణ': {
    'en-IN': 'Weeds can be controlled with mulching, hand weeding, or herbicides.',
    'hi-IN': 'घास-पात को मल्चिंग, हाथ से निकालना या खरपतवारनाशी से नियंत्रित किया जा सकता है।',
    'te-IN': 'గడ్డి పెరగకుండా మల్చింగ్, చేతితో తీయడం లేదా హెర్బిసైడ్లు వాడాలి.',
    'ta-IN': 'புல்லிகளை கட்டுப்படுத்த மัล்ச்சிங், கையால் நீக்கம் அல்லது பூச்சிக்கொல்லிகள் பயன்படுத்தலாம்.',
    'mr-IN': 'गवत नियंत्रणासाठी मल्चिंग, हाताने काढणे किंवा रसायन वापरले जाते.'
  },
		};

		const matchedKey = Object.keys(responses).find(key => question.includes(key));
		if (matchedKey) {
			return responses[matchedKey][language] || responses[matchedKey]['en-IN'];
		}

		return {
			'hi-IN': 'माफ़ कीजिए, मैं अभी सीख रहा हूँ। कृपया खेती या फसल से जुड़ा प्रश्न पूछें!',
			'te-IN': 'క్షమించండి, నేను ఇంకా నేర్చుకుంటున్నాను. దయచేసి వ్యవసాయం లేదా పంటల గురించి అడగండి!',
			'ta-IN': 'மன்னிக்கவும், நான் இன்னும் கற்றுக்கொண்டு வருகிறேன். விவசாயம் அல்லது பயிர்கள் குறித்து கேளுங்கள்!',
			'mr-IN': 'माफ करा, मी अजून शिकत आहे. कृपया शेती किंवा पिकांबद्दल प्रश्न विचारा!',
		}[language] || 'Sorry, I am still learning. Please ask about farming, crops, or pesticides!';
	};

	// Start listening
	const handleMicClick = () => {
		if (recognitionRef.current) {
			setIsListening(true);
			recognitionRef.current.lang = language;
			recognitionRef.current.start();
		}
	};

	// Greet when opened
	useEffect(() => {
		if (isOpen) {
			const greeting =
				 language === 'hi-IN'
    ? 'नमस्ते! मैं आपकी कैसे मदद कर सकती हूँ?'
    : language === 'te-IN'
    ? 'హలో! నేను మీకు ఎలా సహాయపడగలను?'
    : language === 'ta-IN'
    ? 'வணக்கம்! நான் உங்களுக்கு எப்படி உதவலாம்?'
    : language === 'mr-IN'
    ? 'नमस्कार! मी तुम्हाला कशाप्रकारे मदत करू शकतो?'
    : 'Hello! How can I help you?';

			setMessages([{ text: greeting, sender: 'bot' }]);
			speak(greeting);
		}
	}, [isOpen, language]);

	return (
		<>
			{/* Floating Chatbot Button */}
			{!isOpen && (
				<motion.button
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsOpen(true)}
					className="fixed left-6 bottom-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
				>
					<MessageCircle className="w-6 h-6" />
				</motion.button>
			)}

			{/* Chatbot Modal */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 100 }}
						className="fixed left-6 bottom-6 z-50 bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col"
					>
						{/* Header */}
						<div className="bg-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
							<span className="font-bold">AgroLens Voice Assistant</span>
							<button
								onClick={() => setIsOpen(false)}
								className="p-1 hover:bg-green-700 rounded-full transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Language Selector */}
						<div className="p-2">
							<select
								value={language}
								onChange={(e) => setLanguage(e.target.value)}
								className="w-full border rounded p-1 text-sm"
							>
								{languages.map((l) => (
									<option key={l.code} value={l.code}>
										{l.label}
									</option>
								))}
							</select>
						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-4 space-y-3">
							{messages.map((msg, idx) => (
								<div
									key={idx}
									className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
								>
									<div
										className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
											msg.sender === 'user'
												? 'bg-green-100 text-green-900'
												: 'bg-green-600 text-white'
										}`}
									>
										{msg.text}
									</div>
								</div>
							))}
							{isListening && <div className="text-xs text-yellow-700 mt-1">Listening...</div>}
						</div>

						{/* Mic Button */}
						<div className="p-4 border-t border-gray-200 flex justify-center">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleMicClick}
								className={`bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-colors ${
									isListening ? 'animate-pulse' : ''
								}`}
								title="Speak your question"
								disabled={isListening}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 18v3m0 0a4 4 0 004-4h-8a4 4 0 004 4zm0-3V5a3 3 0 00-6 0v7a3 3 0 006 0z"
									/>
								</svg>
							</motion.button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}