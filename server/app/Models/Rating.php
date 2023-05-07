<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\JsonResponse;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = ['stars', 'entry_id', 'user_id'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function entry(): BelongsTo {
        return $this->belongsTo(Entry::class);
    }

    public function ratingExists($entryId, $userId):bool{
        // TODO: smart like this?
        $rating = $this->where('entry_id', $entryId)->where('user_id',
            $userId)->get();
        return $rating != null;
    }
}
