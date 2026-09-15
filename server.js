// Server proxy: keeps OPENAI_API_KEY out of browser code.
require('dotenv').config();
const express=require('express');
const OpenAI=require('openai');
const app=express();
app.use(express.json());
app.use(express.static(__dirname));
app.post('/api/context-example',async(req,res)=>{
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'Chưa cấu hình OPENAI_API_KEY trong tệp .env'});
  const {word,meaning}=req.body||{};
  if(!word||!meaning) return res.status(400).json({error:'Thiếu từ vựng'});
  try{
    const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    const response=await client.responses.create({model:process.env.OPENAI_MODEL||'gpt-5-mini',instructions:'Bạn là giáo viên tiếng Anh lớp 8 Việt Nam. Trả lời thật ngắn, chỉ một câu tiếng Anh tự nhiên có dùng đúng từ được yêu cầu, sau đó xuống dòng ghi "Nghĩa: " và một bản dịch tiếng Việt.',input:`Tạo ví dụ cho từ "${word}" (nghĩa: ${meaning}).`});
    res.json({text:response.output_text});
  }catch(error){res.status(500).json({error:'Không tạo được câu ngữ cảnh AI: '+error.message})}
});
app.listen(process.env.PORT||3000,()=>console.log('8B1 English Learning Platform: http://localhost:3000'));
