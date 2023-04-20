<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller{
    
    public function chatbot(Request $request){

        try{

            $question_type= $request->question_type;
    
            if ($question_type == 'question'){
                $question= $request->prompt;
                $prompt= 'As a doctor, $question. If $question is not a medical question and is not related to med, reply only with "Not a medical question" ';
                
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/engines/davinci-codex/completions', [
                    'prompt' => $prompt,
                    'max_tokens' => 128,
                    'temperature' => 0.7,
                ]);
            
                $text = $response->json()['choices'][0]['text'];
    
            } else if ($question_type == 'replacement'){
    
            } else if ($question_type == 'effect'){
    
            } else if ($question_type == 'instruction'){
    
            } else {
    
            }
    
            return response()->json([
                'status' => 'success',
                'message' => 'Answer retrieved successfully.',
                'chargpt' => $text
            ]);
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.'
            ]);
        }
    }
}
