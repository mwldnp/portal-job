<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Department;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $departments = Department::with(['vacancies.applicants'])->get();

        $summary = $departments->map(function ($dept) {
            $totalQuota = $dept->vacancies->sum('quota');
            $accepted = $dept->vacancies->flatMap->applicants->where('status', 'A')->count();
            $rejected = $dept->vacancies->flatMap->applicants->where('status', 'R')->count();
            $remainingQuota = $totalQuota - $accepted;

            return [
                'name' => $dept->name,
                'total_quota' => $totalQuota,
                'accepted' => $accepted,
                'rejected' => $rejected,
                'remaining_quota' => $remainingQuota,
            ];
        });

        // hitung grand total
        $grandTotal = [
            'total_quota' => $summary->sum('total_quota'),
            'accepted' => $summary->sum('accepted'),
            'rejected' => $summary->sum('rejected'),
            'remaining_quota' => $summary->sum('remaining_quota'),
        ];

        $totalDepartment = Department::count();
        $totalVacancy = Vacancy::count();
        $totalApplicant = Applicant::count();

        return Inertia::render('dashboard/index', [
            'departments' => $summary,
            'grandTotal' => $grandTotal,
            'stats' => [
                'total_department' => $totalDepartment,
                'total_vacancy' => $totalVacancy,
                'total_applicant' => $totalApplicant,
            ]
        ]);
    }
}
