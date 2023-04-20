<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Exception;

class ChatbotController extends Controller{
    
    public function chatbot(Request $request){

        try{

            $question_type= $request->question_type;
    
            if ($question_type == 'question'){
                $question= $request->prompt;
                $prompt = $question;

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/completions', [
                    'prompt' => $prompt,
                    'max_tokens' => 100,
                    'temperature' => 0.7,
                    'model' => 'davinci',
                ]);

                $answer = $response->json()['choices'][0]['text'];

                if (preg_match('/(medicine|treatment|disease|symptom|diagnosis|doctor|prescription|pharmacy|hospital|patient)/i', $answer)) {
                    return response()->json([
                        'prompt' => $prompt,
                        'status' => 'success',
                        'message' => 'Answer retrieved successfully.',
                        'answer' => $answer
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Not a medical question'
                    ]);
                }
        
            } else if ($question_type == 'replacement'){
    
            } else if ($question_type == 'effect'){
    
            } else if ($question_type == 'instruction'){
    
            } else {
    
            }
    
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.' .$e->getMessage()
            ]);
        }
    }
}
