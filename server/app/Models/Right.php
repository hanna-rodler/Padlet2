<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Right extends Model
{
    use HasFactory;

    protected $fillable = ['read', 'create', 'update', 'delete',
        'padlet_id', 'user_id'];

    public function padlet(): BelongsTo {
        return $this->belongsTo(Padlet::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
