<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use OpenAI\Laravel\Facades\OpenAI;

use Exception;

class ChatbotController extends Controller{
    
    public function chatbot(Request $request){

        $prompt = $request->prompt;

        $prompt = "Can you provide information about the symptoms of a heart attack?";
        $response = OpenAI::completion()->create([
            'prompt' => $prompt,
            'max_tokens' => 100,
            'temperature' => 0.7,
            'model' => 'davinci',
        ]);
        
        $answer = $response['choices'][0]['text'];

        return response()->json([
            'prompt' => $prompt,
            'status' => 'success',
            'message' => 'Answer retrieved successfully.',
            'answer' => $answer
        ]);

    //     try{
    //         $question_type= $request->question_type;
    //         $prompt= $request->prompt;

    //         if (empty($prompt)) {
    //             return response()->json([
    //                 'error' => 'Question field is required.',
    //             ], 400);
    //         }

    //         if ($question_type == 'question'){

    //             $response = Http::withHeaders([
    //                 'Content-Type' => 'application/json',
    //                 'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
    //             ])->post('https://api.openai.com/v1/completions', [
    //                 'prompt' =>  "Act as a doctor, $prompt?",
    //                 'max_tokens' => 100,
    //                 'temperature' => 0.7,
    //                 'model' => 'davinci',
    //             ]);

    //             $answer = $response->json()['choices'][0]['text'];

    //             if (preg_match('/(medicine|treatment|disease|symptom|diagnosis|health|illness|injury|therapy|condition)/i', $answer)) {
    //                 return response()->json([
    //                     'prompt' => $prompt,
    //                     'status' => 'success',
    //                     'message' => 'Answer retrieved successfully.',
    //                     'answer' => $answer
    //                 ]);
    //             } else {
    //                 return response()->json([
    //                     'status' => 'error',
    //                     'message' => 'Not a medical question'
    //                 ]);
    //             }
        
    //         } else if ($question_type == 'replacement'){

    //             $response = Http::withHeaders([
    //                 'Content-Type' => 'application/json',
    //                 'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
    //             ])->post('https://api.openai.com/v1/completions', [
    //                 'prompt' =>  "What is the replacement for $prompt?",
    //                 'max_tokens' => 80,
    //                 'temperature' => 0.5,
    //                 'model' => 'davinci',
    //             ]);

    //             $replacementMedicine  = $response->json()['choices'][0]['text'];

    //             $pattern = '/(medicine|drug|prescription)/i';
    //             if (!preg_match($pattern, $replacementMedicine)) {
    //                 return response()->json([
    //                     'error' => 'Sorry, I could not find a replacement medicine for the provided medicine name.',
    //                 ], 404);
    //             } else {
    //                 return response()->json([
    //                     'prompt' => $prompt,
    //                     'status' => 'success',
    //                     'message' => 'Replacement medicine retrieved successfully.',
    //                     'replacement' => $replacementMedicine 
    //                 ]);
    //             } 

    //         } else if ($question_type == 'effect'){
    
    //         } else if ($question_type == 'instruction'){
    
    //         } else {
    
    //         }
    
    //     } catch (Exception $e){
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'An error occurred while returning the answer.' .$e->getMessage()
    //         ]);
    //     }
    }
}



