<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Chapter
 *
 * @property int $id
 * @property int $story_id
 * @property string $title
 * @property string $slug
 * @property float $chapter_number
 * @property string|null $content
 * @property array|null $images
 * @property int $word_count
 * @property int $page_count
 * @property bool $is_premium
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read Story $story
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comment[] $comments
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ReadingHistory[] $readingHistory
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereChapterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereIsPremium($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter wherePageCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereStoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter whereWordCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter published()
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter free()
 * @method static \Illuminate\Database\Eloquent\Builder|Chapter premium()
 * @method static \Database\Factories\ChapterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Chapter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'story_id',
        'title',
        'slug',
        'chapter_number',
        'content',
        'images',
        'word_count',
        'page_count',
        'is_premium',
        'is_published',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'chapter_number' => 'decimal:2',
        'images' => 'array',
        'is_premium' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Scope a query to only include published chapters.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)->whereNotNull('published_at');
    }

    /**
     * Scope a query to only include free chapters.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFree($query)
    {
        return $query->where('is_premium', false);
    }

    /**
     * Scope a query to only include premium chapters.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePremium($query)
    {
        return $query->where('is_premium', true);
    }

    /**
     * Get the story that owns the chapter.
     */
    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }

    /**
     * Get the comments for the chapter.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id')->latest();
    }

    /**
     * Get the reading history for the chapter.
     */
    public function readingHistory(): HasMany
    {
        return $this->hasMany(ReadingHistory::class);
    }
}