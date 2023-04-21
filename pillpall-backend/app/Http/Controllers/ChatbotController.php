<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

use Exception;

use App\Models\User;
use App\Models\Chatbot;

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
                'prompt' =>  "Please answer only by yes if this, $prompt, is a medical question. Else, answer only by no",
                'max_tokens' => 50,
                'temperature' => 0.2,
                'n' => 1,
                'stop' => '\n',
                'model' => 'text-davinci-002',
            ]);

            $answer = $response->json()['choices'][0]['text'];

            if (stripos((string)$answer, 'yes') !== false) {

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/completions', [
                    'prompt' =>  "Act as a medical expert, $prompt?",
                    'max_tokens' => 50,
                    'temperature' => 0.2,
                    'n' => 1,
                    'stop' => '\n',
                    'model' => 'text-davinci-002',
                ]);
    
                $answer = $response->json()['choices'][0]['text'];

                $response = [
                    'prompt' => $prompt,
                    'status' => 'success',
                    'message' => 'Answer retrieved successfully.',
                    'answer' => $answer
                ];
            } else {
                $answer = 'Not a medical question';
                $response = [
                    'prompt' => $prompt,
                    'status' => 'failure',
                    'message' => 'Answer fails.',
                    'answer' => $answer
                ];
            }

            $chatbot= new Chatbot();
            $chatbot->user_id= Auth::id();
            $chatbot->question_type = 'question';
            $chatbot->question = $request->prompt;
            $chatbot->answer = $answer;
            $chatbot->save();

            return response()->json($response);
        
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.' .$e->getMessage()
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
                'prompt' =>  "Please answer only by yes if this, $prompt, is a medicine. Else, answer only by no",
                'max_tokens' => 50,
                'temperature' => 0.2,
                'n' => 1,
                'stop' => '\n',
                'model' => 'text-davinci-002',
            ]);

            $answer = $response->json()['choices'][0]['text'];

            if (stripos((string)$answer, 'yes') !== false) {

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/completions', [
                    'prompt' => 'Act as a pharmacist, answer only with 2 medicine names that could best replace ' .$prompt,
                    'max_tokens' => 80,
                    'temperature' => 0.2,
                    'n' => 1,
                    'stop' => '\n',
                    'model' => 'text-davinci-002',
                ]);
    
                $answer = $response->json()['choices'][0]['text'];

                $response = [
                    'prompt' => $prompt,
                    'status' => 'success',
                    'message' => 'Answer retrieved successfully.',
                    'answer' => $answer,
                ];
            } else {
                $answer = 'Not a medicine';
                $response = [
                    'prompt' => $prompt,
                    'status' => 'failure',
                    'message' => 'Answer fails.',
                    'answer' => $answer
                ];
            }
        
            $chatbot= new Chatbot();
            $chatbot->user_id= Auth::id();
            $chatbot->question_type = 'question';
            $chatbot->question = $request->prompt;
            $chatbot->answer = $answer;
            $chatbot->save();

            return response()->json($response);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.' 
            ]);
        }
    }
               
    public function chatbot_effect(Request $request){

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
                'prompt' =>  "Please answer only by yes if this, $prompt, is a medicine. Else, answer only by no",
                'max_tokens' => 50,
                'temperature' => 0.2,
                'n' => 1,
                'stop' => '\n',
                'model' => 'text-davinci-002',
            ]);

            $answer = $response->json()['choices'][0]['text'];

            if (stripos((string)$answer, 'yes') !== false) {

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/completions', [
                    'prompt' => 'Act as a pharmacist or doctor, what is the side effect of ' .$prompt,
                    'max_tokens' => 80,
                    'temperature' => 0.2,
                    'n' => 1,
                    'stop' => '\n',
                    'model' => 'text-davinci-002',
                ]);
    
                $answer = $response->json()['choices'][0]['text'];
                $response = [
                    'prompt' => $prompt,
                    'status' => 'success',
                    'message' => 'Answer retrieved successfully.',
                    'answer' => $answer,
                ];
            } else {
                $answer = 'Not a medicine';
                $response = [
                    'prompt' => $prompt,
                    'status' => 'failure',
                    'message' => 'Answer fails.',
                    'answer' => $answer
                ];
            }
        
            $chatbot= new Chatbot();
            $chatbot->user_id= Auth::id();
            $chatbot->question_type = 'question';
            $chatbot->question = $request->prompt;
            $chatbot->answer = $answer;
            $chatbot->save();

            return response()->json($response);
        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.' 
            ]);
        }
    }

    public function chatbot_instruction(Request $request){

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
                'prompt' =>  "Please answer only by yes if this, $prompt, is a medicine. Else, answer only by no",
                'max_tokens' => 50,
                'temperature' => 0.2,
                'n' => 1,
                'stop' => '\n',
                'model' => 'text-davinci-002',
            ]);

            $answer = $response->json()['choices'][0]['text'];

            if (stripos((string)$answer, 'yes') !== false) {

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . env('CHATGPT_API_KEY'),
                ])->post('https://api.openai.com/v1/completions', [
                    'prompt' => 'Act as a pharmacist or doctor, what is the intake instruction of ' .$prompt,
                    'max_tokens' => 80,
                    'temperature' => 0.2,
                    'n' => 1,
                    'stop' => '\n',
                    'model' => 'text-davinci-002',
                ]);
    
                $answer = $response->json()['choices'][0]['text'];
                $response = [
                    'prompt' => $prompt,
                    'status' => 'success',
                    'message' => 'Answer retrieved successfully.',
                    'answer' => $answer,
                ];
            } else {
                $answer = 'Not a medicine';
                $response = [
                    'prompt' => $prompt,
                    'status' => 'failure',
                    'message' => 'Answer fails.',
                    'answer' => $answer
                ];
            }

            $chatbot= new Chatbot();
            $chatbot->user_id= Auth::id();
            $chatbot->question_type = 'question';
            $chatbot->question = $request->prompt;
            $chatbot->answer = $answer;
            $chatbot->save();
        
            return response()->json($response);

        } catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while returning the answer.' 
            ]);
        }
    }

}



