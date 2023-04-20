<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use Exception;

class ChatbotController extends Controller{
    
    public function chatbot_question(Request $request){

        try{
            $prompt= $request->prompt;

            if (empty($prompt)) {
                return response()->json([
                    'error' => 'the question field is required.',
                ], 400);
            }

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
            ])->post('https://api.openai.com/v1/completions', [
                'prompt' =>  "Act as a medical expert, $prompt?",
                'max_tokens' => 150,
                'temperature' => 0.3,
                'n' => 1,
                'stop' => '\n',
                'model' => 'text-davinci-002',
            ]);

            $answer = $response->json()['choices'][0]['text'];

            if (preg_match('/(medicine|treatment|disease|symptom|diagnosis|health|illness|injury|therapy|condition)/i', $answer)) {
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
        
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.'
            ]);
        }
    }
            
    public function chatbot_replacement(Request $request){

        try{
            $prompt= $request->prompt;

            if (empty($prompt)) {
                return response()->json([
                    'error' => 'the question field is required.',
                ], 400);
            }

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
            ])->post('https://api.openai.com/v1/completions', [
                'prompt' => 'Act as a pharmacist, answer only with 2 medicine names that could replace best the' .$prompt,
                'max_tokens' => 80,
                'temperature' => 0.2,
                'n' => 1,
                'stop' => '\n',
                'model' => 'text-davinci-002',
            ]);

            $replacementMedicine  = $response->json()['choices'][0]['text'];

                return response()->json([
                    'prompt' => $prompt,
                    'status' => 'success',
                    'message' => 'Replacement medicine retrieved successfully.',
                    'replacement' => $replacementMedicine 
                ]);  
        
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.'
            ]);
        }
    }
     
                
    public function chatbot_effect(Request $request){
    }

    public function chatbot_instruction(Request $request){
    }

}



