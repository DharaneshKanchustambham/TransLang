// Libraries import 
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'; // Add useEffect import
import { countries, countryCode } from './Language';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AnimatedHeading from './AnimatedHeading';
import "./LangSel.css";

export default function LangSel({defFromlang, defToLang}) {
  const [FromLanguage, setFromLang] = useState(defFromlang);
  const [ToLanguage, setToLang] = useState(defToLang);
  const [fromInput, setFromInp] = useState('');
  const [buttVal, modButtVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fromhandleChange = (event) => {
    setFromLang((event.target.value).toLowerCase());
  };

  const tohandleChange = (event) => {
    setToLang((event.target.value));
  };

  const modInp = (e) => setFromInp(e.target.value);

  const clickHandle = () => {
    setIsLoading(true);
    setIsButtonDisabled(true);
    setTimeout(() => {
      axios.get(`https://api.mymemory.translated.net/get?q=${fromInput}!&langpair=${FromLanguage}|${ToLanguage}`)
        .then(res => {
          console.log(res.data);
          modButtVal(res.data.responseData.translatedText);
        })
        .catch(err => {
          alert(`Error! Please try again. ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
          setIsButtonDisabled(false);
        });
    }, 200);
  };

  useEffect(() => {
    setIsButtonDisabled(true); // Disable button on language change
    setTimeout(() => {
      setIsButtonDisabled(false); // Enable button after 10 seconds
    }, 500);
  }, [FromLanguage, ToLanguage]); // Trigger effect on language change

  // Rest of your component code...


  const senderSpeech = () => {
      var msgS = new SpeechSynthesisUtterance(fromInput);
      msgS.lang = FromLanguage;
      speechSynthesis.speak(msgS);
  };

  

  const receiverSpeech = () => {
    
      var msgR = new SpeechSynthesisUtterance(buttVal);
      msgR.lang = ToLanguage;
      speechSynthesis.speak(msgR);

  };
 
   
  

  const senderCopy = () => {
    navigator.clipboard.writeText(fromInput);
  };

  const receiverCopy = () => {
    navigator.clipboard.writeText(buttVal);
  };

  const langExachange = () => {
    let lexc = FromLanguage;
    setFromLang(ToLanguage);
    setToLang(lexc);
  };

  const textExchange = () => {
    let texc = fromInput;
    setFromInp(buttVal);
    modButtVal(texc);
  };


  return (
    <Stack className='real' direction="column" style={{margin:"0 30%"}}>
      <Stack className='outer'>
        <Box className="inner">
          <Stack className='head'>
            <AnimatedHeading/>
          </Stack>
          <Stack direction="row" className="lstack" spacing={3}>
            {/* From Language Selector */}
            <FormControl className="fol" sx={{ minWidth: "37%"}}>
              <InputLabel id="from-lang-label">Language</InputLabel>
              <Select
                labelId="from-lang-label"
                id="from-lang-select"
                value={FromLanguage}
                label="Language"
                onChange={fromhandleChange}
              >
                {countryCode.map(code => (
                  <MenuItem value={code} key={code}>{countries[code]}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack style={{marginTop:"3%",cursor:"pointer" }}><MultipleStopIcon onClick={langExachange}/></Stack>
            {/* To Language Selector */}
            <FormControl className="tol" sx={{minWidth: "37%"}}>
              <InputLabel id="to-lang-label">Language</InputLabel>
              <Select
                labelId="to-lang-label"
                id="to-lang-select"
                value={ToLanguage}
                label="Language"
                onChange={tohandleChange}
              >
                {countryCode.map(code => (
                  <MenuItem value={code} key={code}>{countries[code]}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack className="tstack" direction="row" spacing={3}>
            {/* Text Input for Translation */}
            <TextField
              id="from-text"
              label="Translate here"
              multiline
              rows={4}
              sx={{width:"37.5%"}}
              value={fromInput}
              onChange={modInp}
            />
            <Stack style={{marginTop:"10%",cursor:"pointer"}}><MultipleStopIcon onClick={textExchange}/></Stack>
            {/* Translated Text Display */}
            <TextField
              id="to-text"
              label="Translated text"
              multiline
              sx={{width:"37.5%"}}
              rows={4}
              value={buttVal}
              readOnly
              placeholder="Translated"
            />
          </Stack>
          <Stack direction="row"> 
            <Stack direction="row" style={{width :'30%',margin:"5% 0 0 10%"}}>
              {/* Buttons for Speech and Copy */}
              <VolumeUpIcon style={{margin:"0 20px",cursor:"pointer"}} onClick={senderSpeech}></VolumeUpIcon>
              <ContentCopyIcon style={{margin:"0 20px",cursor:"pointer"}} onClick={senderCopy}></ContentCopyIcon>
            </Stack>
            <Stack direction="row" style={{width :'30%',margin:"5% 0 0 25%"}}>
              <VolumeUpIcon style={{margin:"0 20px",cursor:"pointer"}} onClick={receiverSpeech}></VolumeUpIcon>
              <ContentCopyIcon style={{margin:"0 20px",cursor:"pointer"}} onClick={receiverCopy}></ContentCopyIcon>
            </Stack>
          </Stack>
          <Stack style={{width :'30%',margin:"5% 0 0 40%"}}>
            {/* Translate Button */}
            <Button variant="contained" onClick={clickHandle} disabled={isLoading || isButtonDisabled}>
              {isLoading ? <CircularProgress size={24} /> : "TRANSLATE"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
