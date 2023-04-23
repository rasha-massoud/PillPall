<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Medication;
use App\Models\User;

use App\Notifications\MedicineReminder;

class SendMedicationReminders extends Command{

    protected $signature = 'medication:remind';

    protected $description = 'Send medication reminders to patients based on their medication timing';

    public function handle(){
        $medications = Medication::whereIn('timing', [6, 8, 10, 12, 14, 16, 18, 20, 22, 24])->get();

        $now = Carbon::now();

        foreach ($medications as $medication) {
            $medicationTime = Carbon::createFromFormat('H:i:s', $medication->timing . ':00:00');

            if ($now->diffInMinutes($medicationTime, false) <= 30) {
                $user = User::find($medication->user_id);

                $message = 'It\'s time to take your medication.';

                $user->notify(new MedicineReminder($message));
            }
        }
    }
}