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
                $prompt= "Act as a doctor, '{$question}'. If '{$question}' is not a medical question, reply only with 'Not a medical question'";

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/completions', [
                    'prompt' => $prompt,
                    'max_tokens' => 127,
                    'temperature' => 0.8,
                    'model' => 'davinci',
                ]);

                $jsonResponse = json_encode($response->json());

        
            } else if ($question_type == 'replacement'){
    
            } else if ($question_type == 'effect'){
    
            } else if ($question_type == 'instruction'){
    
            } else {
    
            }
    
            return response()->json([
                'prompt' => $prompt,
                'status' => 'success',
                'message' => 'Answer retrieved successfully.',
                'answer' => $response->json()
            ]);
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.' .$e->getMessage()
            ]);
        }
    }
}
